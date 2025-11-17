// @/components/students/myCourseTab.tsx

"use client"
import React, { useEffect, useState } from "react"
import { BookOpen, Zap, RefreshCcw } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { useAuth } from "@/components/auth-provider"
import CourseCard from "@/components/students/courseCard"

type Course = {
  _id: string
  slug: string
  title: string
  status?: string
  price: number
  originalPrice?: number
  duration?: string
  features?: string[]
  enrollments?: number
  rating?: number
  progress?: number
}

// 1. Global Cache variables for high-performance tab switching
let coursesCache: Course[] | null = null;
let lastFetched: number | null = null;
// 5 minutes in milliseconds
const REFECTCH_INTERVAL = 300000; 

const MyCoursesTab = () => {
  const { user } = useAuth()
  // Initialize state directly from cache for instant remount rendering
  const [courses, setCourses] = useState<Course[]>(coursesCache || [])
  // Only show loading indicator if the cache is empty on mount
  const [loading, setLoading] = useState(!coursesCache) 
  const [error, setError] = useState("")
  // State for explicitly forcing a refresh UI update
  const [isRefreshing, setIsRefreshing] = useState(false);


  const fetchCourses = async (force: boolean = false) => {
    if (!user?._id) return

    // Caching/Stale-While-Revalidate Logic:
    // If we have cached data, not forced, AND it's not stale, skip the API call.
    if (coursesCache && !force && lastFetched && (Date.now() - lastFetched < REFECTCH_INTERVAL)) {
        // If we hit this, the component has loaded instantly from cache
        setLoading(false);
        return;
    }
    
    // Set appropriate loading state
    if (coursesCache && !force) {
        // If we have stale data, render it but start fetching in background (SWR pattern)
        setIsRefreshing(true); 
    } else {
        // No data, show full loading screen
        setLoading(true);
    }
    
    setError("")
    
    try {
      const res = await fetch(`/api/enrollments?studentId=${user._id}`, {
        credentials: "include",
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || "Failed to fetch courses")

      // Process the data efficiently
      const enrolledCourses: Course[] = data.enrollments.map((e: any) => ({
        _id: e.course._id,
        slug: e.course.slug,
        title: e.course.title,
        status: e.course.status || "In Progress",
        price: e.course.price,
        originalPrice: e.course.originalPrice,
        duration: e.course.duration,
        features: e.course.features,
        enrollments: e.course.enrollments || (100 + Math.floor(Math.random() * 10)),
        rating: e.course.rating,
        progress: e.progress || Math.floor(Math.random() * 100),
      }))

      setCourses(enrolledCourses)
      coursesCache = enrolledCourses; // Update global cache
      lastFetched = Date.now(); // Update fetch timestamp
      
    } catch (err: any) {
      // Only show error if no cached data is available
      if (!coursesCache) { 
        setError(err.message)
      } else {
        console.error("Background course refresh failed:", err.message);
      }
    } finally {
      setLoading(false)
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    // Check if we need to fetch immediately (no cache, or cache is stale)
    if (!coursesCache || (lastFetched && (Date.now() - lastFetched > REFECTCH_INTERVAL))) {
        fetchCourses();
    }
  }, [user]) // Depend only on user object/ID

  if (loading) return <p className="text-center py-10 text-lg text-indigo-600">Loading your courses...</p>
  if (error && courses.length === 0) return <p className="text-red-500 text-center py-10">Error loading courses: {error}</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          My Enrolled Courses ({courses.length})
        </h2>
        <div className="flex gap-2">
          <Button onClick={() => fetchCourses(true)} variant="outline" disabled={isRefreshing}>
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Explore Catalog
          </Button>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            // Ensure CourseCard is a performant component (memoized if complex)
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        // Render this block only if courses.length is 0 AND not loading
        <Card>
          <CardContent className="p-6 text-center space-y-3">
            <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
            <p className="text-gray-500">
              It looks like you haven't started any courses yet. Enroll in a new course to begin your journey!
            </p>
            <Button className="gradient-primary">Explore New Courses</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default MyCoursesTab
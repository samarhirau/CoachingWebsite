"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EnrollmentModal } from "@/components/enrollment-modal"
import { Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu, PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesPage() {
  const initialLimit = 4  // first load 4 courses
  const loadMoreCount = 4 // each click load 4 more

  const [courses, setCourses] = useState<any[]>([])
  const [visibleCourses, setVisibleCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course/list")
        const data = await res.json()
        if (data.success) {
          const mappedCourses = data.courses.map((course: any, index: number) => ({
            ...course,
            icon: [Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu, PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase][index % 16],
          }))
          setCourses(mappedCourses)
          setVisibleCourses(mappedCourses.slice(0, initialLimit))
        }
      } catch (err) {
        console.error("Failed to fetch courses", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const handleLoadMore = () => {
    setVisibleCourses((prev) => {
      const nextCount = prev.length + loadMoreCount
      return courses.slice(0, nextCount)
    })
  }

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course)
    setIsEnrollmentOpen(true)
  }

 

  return (
    <main className="min-h-screen py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>

        <Button asChild variant="ghost" className="-ml-4 mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
            {loading && courses.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Card key={idx} className="border-0 shadow-lg overflow-hidden">
                  <div className="h-2 bg-gradient-to-r " />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-8 w-20 mb-1" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />

                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <Skeleton key={idx} className="h-4 w-full" />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 flex-1" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : null}
          {visibleCourses.map((course, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color} text-white`}>
                      <course.icon className="h-6 w-6" />
                    </div>
                    <div >
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {course.level}
                      </Badge>
                       <Badge
      className={`${
        course.mode === "ONLINE" 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800"
      } px-2 py-1 text-xs rounded ml-2.5`}
    >
      {course.mode}   
    </Badge>
                    </div> 
                  </div>
                  <div className="text-right flex-col flex mb-4 space-x-1">
                  <div className="flex space-x-2 items-baseline">
                    <div className="text-2xl font-bold text-primary">₹{course.price}</div>
                    <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
                       </div> 
                 {course.originalPrice > course.price && (
                      <div className="text-sm text-green-600 font-semibold mb-1">
                        Save ₹{course.originalPrice - course.price}
                        </div>
                    )}
                    
                      
                  
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.studentsCount || 0} enrolled
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button className="flex-1 gradient-primary group" onClick={() => handleEnrollClick(course)}>
                    {course.enrolled ? "Continue" : "Enroll Now"}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/courses/${course.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCourses.length < courses.length && (
          <div className="text-center mt-10">
            <Button onClick={handleLoadMore} size="lg" variant="outline">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse} />
    </main>
  )
}

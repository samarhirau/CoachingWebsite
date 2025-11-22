
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import { EnrollmentModal } from "@/components/enrollment-modal"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Skeleton } from "@/components/ui/skeleton"

interface Course {
  _id: string
  title: string
  slug: string
  description: string
  duration: string
  maxStudents: number
  rating: number
  price: number
  originalPrice: number
  features: string[]
  couponCode: { code: string; discount: number }[];
  level: string
  color: string
  roadmap?: string[]
}

export function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {

      try {
        const res = await fetch("/api/course/list")
        const data = await res.json()


        
        // Handle API returning array directly or wrapped in courses
          const courses = Array.isArray(data) ? data : data.courses || []
      setCourses(
        courses.map((course: { couponCode: any }) => ({
  ...course,
  couponCode: course.couponCode || []
}))

        )
      } catch (err) {
        console.error("Failed to fetch courses:", err)
        setCourses([])
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course)
    setIsEnrollmentOpen(true)
  }

  


  const { user } = useAuth();
  return (
    <>
      <section className="py-20" id="course-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Affordable Courses</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Learning with <span className="text-gradient">Upcoder</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Beginner-friendly coding courses starting at just ₹29. Learn web development, data basics, and more.
            </p>
          </div>
{/* 
          <div className="grid md:grid-cols-3 gap-8">
            {isLoading && courses.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Card key={idx} className="border-0 shadow-lg overflow-hidden">
                  <div className="h-2 bg-gray-400" />
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
            {courses.map((course) => (
              <Card key={course._id} className="hover-lift border-0 shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <Badge variant="outline" className="mt-1">{course.level}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">₹{course.price}</div>
                      <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{course.description.slice(0,100)}....</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</div>
                    <div className="flex items-center gap-1"><Users className="h-4 w-4" />{course.maxStudents}+ enrolled</div>
                    <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{course.rating}</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What you'll learn:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    {user ? (
                      <Button className="flex-1 gradient-primary group" onClick={() => handleEnrollClick(course)}>
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button asChild className="flex-1 gradient-primary group ">
                        <Link href="/login">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/courses/${course.slug}`}>Learn More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}

          <div className="grid md:grid-cols-3 gap-8">
  {isLoading && courses.length === 0
    ? Array.from({ length: 4 }).map((_, idx) => (
        <Card key={idx} className="border-0 shadow-lg overflow-hidden h-full flex flex-col">
          <div className="h-2 bg-gray-400" />
          <CardHeader className="pb-4 min-h-[80px]">
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
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <Skeleton className="h-16 w-full" /> {/* fixed description height */}
            </div>
            <div className="flex gap-3 pt-2 mt-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </CardContent>
        </Card>
      ))
    : courses.map((course) => (
        <Card key={course._id} className="hover-lift border-0 shadow-lg overflow-hidden h-full flex flex-col">
          <div className={`h-2 bg-gradient-to-r ${course.color}`} />
          <CardHeader className="pb-4 min-h-[100px]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{course.title}</h3>
                <Badge variant="outline" className="mt-1">{course.level}</Badge>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">₹{course.price}</div>
                <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <p className="text-muted-foreground leading-relaxed h-16 ">
                {course.description.slice(0, 100)}...
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</div>
                <div className="flex items-center gap-1"><Users className="h-4 w-4" />{course.maxStudents}+ enrolled</div>
                <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{course.rating}</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">What you'll learn:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2 mt-4">
              {user ? (
                <Button className="flex-1 gradient-primary group" onClick={() => handleEnrollClick(course)}>
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <Button asChild className="flex-1 gradient-primary group ">
                  <Link href="/login">
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href={`/courses/${course.slug}`}>Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
</div>


          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              <Link href="/courses" className="flex items-center">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse ?? undefined}  user={user} />
    </>
  )
}



"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import { EnrollmentModal } from "@/components/enrollment-modal"
import { useAuth} from "@/components/auth-provider"

interface Course {
  _id: string
  title: string
  slug: string
  description: string
  duration: string
  students: any[]
  rating: number
  price: number
  originalPrice: number
  features: string[]
  level: string
  color?: string
  details?: string
  roadmap?: string[]
  timeline?: { month: string; focus: string }[]
}

export default function CourseDetailsPage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${params.slug}`)
        if (!res.ok) throw new Error("Course not found")
        const data = await res.json()
        setCourse(data)
      } catch (err) {
        console.error(err)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [params.slug])


  const { user } = useAuth()

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!course) return <div className="text-center py-20">Course not found</div>

  return (
    <>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{course.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-10">
              <div className="flex items-center gap-1"><Clock className="h-4 w-4 text-blue-500" />{course.duration}</div>
              <div className="flex items-center gap-1"><Users className="h-4 w-4 text-green-500" />  {course.students ? course.students.length : 0} enrolled</div>
              <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{course.rating}</div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{course.details}</p>

            <Card className="bg-white dark:bg-gray-800 shadow-xl border-t-4 border-t-primary rounded-lg mb-10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />{feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6">Learning Roadmap</h3>
            <div className="relative flex flex-wrap flex-col md:flex-row md:items-start gap-8 md:gap-0 before:absolute before:left-3 md:before:left-0 md:before:top-1/2 before:w-px md:before:w-full md:before:h-px before:bg-gray-300 before:-z-10">
  {course.roadmap?.map((step, idx) => (
    <div
      key={idx}
      className="flex-1 flex items-center gap-4 md:flex-col md:items-center md:text-center min-w-[150px] pb-5"
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0 z-10">
        {idx + 1}
      </div>
      <span className="text-base font-medium mt-1 md:mt-3">{step}</span>
    </div>
  ))}
</div>

            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="bg-white dark:bg-gray-800 sticky top-10 shadow-xl rounded-lg p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="text-4xl font-extrabold text-primary">₹{course.price}</div>
                <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
                <Badge variant="secondary" className="w-fit">{course.level}</Badge>
              </div>

             { user ? (<Button size="lg" className="w-full text-lg font-bold gradient-primary py-3" onClick={() => setIsEnrollmentOpen(true)}>
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>) : (
                <Button size="lg" className="w-full text-lg font-bold gradient-primary py-3" disabled>
                Please login to enroll
              </Button>
             ) }

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <h4 className="text-lg font-semibold mb-4">Course Timeline</h4>
              <ul className="space-y-3">
                {course.timeline?.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Badge variant="outline" className="w-24 justify-center">{t.month}</Badge>
                    <span className="text-gray-700 dark:text-gray-300">{t.focus}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={course} />
    </>
  )
}


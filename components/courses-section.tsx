// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Clock, Users, Star, ArrowRight, Code, Database, Smartphone, Cloud } from "lucide-react"
// import { EnrollmentModal } from "@/components/enrollment-modal"
// import Link from "next/link"

// export function CoursesSection() {
//   const [selectedCourse, setSelectedCourse] = useState<any>(null)
//   const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

//   const courses = [
//     {
//       icon: Code,
//       slug: "full-stack-web-development",
//       title: "Full Stack Web Development",
//       description: "Master React, Node.js, MongoDB and build production-ready web applications",
//       duration: "6 months",
//       students: "150+ enrolled",
//       rating: "4.9",
//       price: "₹45,000",
//       originalPrice: "₹60,000",
//       features: ["React & Next.js", "Node.js & Express", "MongoDB", "AWS Deployment"],
//       level: "Beginner to Advanced",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Database,
//       slug: "data-science-ai",
//       title: "Data Science & AI",
//       description: "Learn Python, Machine Learning, and AI to become a data scientist",
//       duration: "8 months",
//       students: "120+ enrolled",
//       rating: "4.8",
//       price: "₹55,000",
//       originalPrice: "₹75,000",
//       features: ["Python & Pandas", "Machine Learning", "Deep Learning", "Data Visualization"],
//       level: "Intermediate",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: Smartphone,
//       slug: "mobile-app-development",
//       title: "Mobile App Development",
//       description: "Build native iOS and Android apps using React Native and Flutter",
//       duration: "5 months",
//       students: "80+ enrolled",
//       rating: "4.7",
//       price: "₹40,000",
//       originalPrice: "₹55,000",
//       features: ["React Native", "Flutter", "Firebase", "App Store Deployment"],
//       level: "Intermediate",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: Cloud,
//       slug: "devops-cloud-computing",
//       title: "DevOps & Cloud Computing",
//       description: "Master AWS, Docker, Kubernetes and modern deployment practices",
//       duration: "4 months",
//       students: "60+ enrolled",
//       rating: "4.9",
//       price: "₹35,000",
//       originalPrice: "₹50,000",
//       features: ["AWS Services", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
//       level: "Advanced",
//       color: "from-orange-500 to-red-500",
//     },
//   ]

//   const handleEnrollClick = (course: any) => {
//     setSelectedCourse(course)
//     setIsEnrollmentOpen(true)
//   }

//   return (
//     <>
//       <section className="py-20" id="course-section">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <Badge variant="secondary" className="mb-4">
//               Our Courses
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Choose Your <span className="text-gradient">Learning Path</span>
//             </h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Comprehensive courses designed by industry experts to take you from beginner to job-ready professional
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {courses.map((course, index) => (
//               <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden">
//                 <div className={`h-2 bg-gradient-to-r ${course.color}`} />
//                 <CardHeader className="pb-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color} text-white`}>
//                         <course.icon className="h-6 w-6" />
//                       </div>
//                       <div>
//                         <h3 className="text-xl font-bold">{course.title}</h3>
//                         <Badge variant="outline" className="mt-1">
//                           {course.level}
//                         </Badge>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="text-2xl font-bold text-primary">{course.price}</div>
//                       <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <p className="text-muted-foreground leading-relaxed">{course.description}</p>

//                   <div className="flex items-center gap-6 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <Clock className="h-4 w-4" />
//                       {course.duration}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Users className="h-4 w-4" />
//                       {course.students}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       {course.rating}
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-sm">What you'll learn:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {course.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center gap-2 text-sm">
//                           <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex gap-3 pt-2">
//                     <Button className="flex-1 gradient-primary group" onClick={() => handleEnrollClick(course)}>
//                       Enroll Now
//                       <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                   <Button asChild variant="outline" className="flex-1 bg-transparent">
//   <Link href={`/courses/${course.slug}`}>
//     Learn More
//   </Link>
// </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="text-center mt-12">
//             <Button variant="outline" size="lg">  <Link href="/courses" className="flex items-center">
//               View All Courses
//               <ArrowRight className="ml-2 h-4 w-4" />
//             </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse} />
//     </>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight } from "lucide-react"
import { EnrollmentModal } from "@/components/enrollment-modal"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

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
  level: string
  color: string
}

export function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/course/list")
        const data = await res.json()

        // Handle API returning array directly or wrapped in courses
        const coursesArray = Array.isArray(data.courses) ? data.courses : Array.isArray(data) ? data : []
        setCourses(
          coursesArray.map((c: any) => ({
            ...c,
            studentsCount: c.students?.length || 0,
            color: c.color || "from-blue-500 to-cyan-500", // default gradient
          }))
        )
      } catch (err) {
        console.error("Failed to fetch courses:", err)
        setCourses([])
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
            <Badge variant="secondary" className="mb-4">Our Courses</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your <span className="text-gradient">Learning Path</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive courses designed by industry experts to take you from beginner to job-ready professional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                  <p className="text-muted-foreground leading-relaxed">{course.description}</p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</div>
                    <div className="flex items-center gap-1"><Users className="h-4 w-4" />{course.maxStudents}+ enrolled</div>
                    <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{course.rating}</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">What you'll learn:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
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

      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse}  user={user} />
    </>
  )
}

// // "use client"
// // import { useEffect, useState } from "react"
// // import { BookOpen, Zap, RefreshCcw } from "lucide-react"
// // import { Card, CardContent } from "../ui/card"
// // import { Button } from "../ui/button"
// // import { useAuth } from "@/components/auth-provider"
// // import CourseCard from "@/components/students/courseCard"

// // type Course = {
// //   _id: string
// //   slug: string
// //   title: string
// //   status?: string
// //   price: number
// //   originalPrice?: number
// //   duration?: string
// //   features?: string[]
// //   enrollments?: number
// //   rating?: number
// //   progress?: number
// // }

// // const MyCoursesTab = ({ preloadedCourses = [] }: { preloadedCourses?: Course[] }) => {
// //   const { user } = useAuth()
// //   const [courses, setCourses] = useState<Course[]>(preloadedCourses)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState("")

// //   const fetchCourses = async () => {
// //     if (!user) return
// //     setLoading(true)
// //     try {
// //       const res = await fetch(`/api/enrollments?studentId=${user._id}`, {
// //         credentials: "include",
// //       })
// //       const data = await res.json()

// //       if (!res.ok) throw new Error(data?.error || "Failed to fetch courses")

// //       const enrolledCourses: Course[] = data.enrollments.map((e: any) => ({
// //         _id: e.course._id,
// //         slug: e.course.slug,
// //         title: e.course.title,
// //         status: e.course.status || "In Progress",
// //         price: e.course.price,
// //         originalPrice: e.course.originalPrice,
// //         duration: e.course.duration,
// //         features: e.course.features,
// //         enrollments: e.course.enrollments || (100 + Math.floor(Math.random() * 10)),
// //         rating: e.course.rating,
// //         progress: e.progress || Math.floor(Math.random() * 100),
// //       }))

// //       setCourses(enrolledCourses)
// //     } catch (err: any) {
// //       setError(err.message)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchCourses()
// //   }, [user])

// //   if (loading) return <p>Loading your courses...</p>
// //   if (error) return <p className="text-red-500">{error}</p>

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           My Enrolled Courses ({courses.length})
// //         </h2>
// //         <div className="flex gap-2">
// //           <Button onClick={fetchCourses} variant="outline">
// //             <RefreshCcw className="h-4 w-4" />
// //           </Button>

// //           <Button variant="outline">
// //             <BookOpen className="h-4 w-4 mr-2" />
// //             Explore Catalog
// //           </Button>
// //         </div>
// //       </div>

// //       {courses.length > 0 ? (
// //         <div className="grid md:grid-cols-2 gap-6">
// //           {courses.map((course) => (
// //             <CourseCard key={course._id} course={course} />
// //           ))}
// //         </div>
// //       ) : (
// //         <Card>
// //           <CardContent className="p-6 text-center space-y-3">
// //             <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
// //             <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
// //             <p className="text-gray-500">
// //               It looks like you haven't started any courses yet. Enroll in a new course to begin your journey!
// //             </p>
// //             <Button className="gradient-primary">Explore New Courses</Button>
// //           </CardContent>
// //         </Card>
// //       )}
// //     </div>
// //   )
// // }

// // export default MyCoursesTab

// "use client"
// import useSWR from "swr"
// import { BookOpen, RefreshCcw, Zap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useAuth } from "@/components/auth-provider"
// import CourseCard from "./courseCard"

// const fetcher = (url: string) =>
//   fetch(url, { credentials: "include" }).then(res => res.json())

// export default function MyCoursesTab() {
//   const { user } = useAuth()
//   const { data, isLoading, error, mutate } = useSWR(
//     user ? `/api/enrollments?studentId=${user._id}` : null,
//     fetcher,
//     { revalidateOnFocus: false }
//   )

//   if (isLoading) return <p>Loading...</p>
//   if (error) return <p>Error loading courses</p>

//   const courses = data?.enrollments || []

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between">
//         <h2 className="text-2xl font-bold">My Courses ({courses.length})</h2>
//         <div className="flex gap-2">
//           <Button onClick={() => mutate()}>
//             <RefreshCcw className="w-4 h-4" />
//           </Button>
//           <Button>
//             <BookOpen className="w-4 h-4 mr-2" /> Explore Courses
//           </Button>
//         </div>
//       </div>

//       {courses.length ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           {courses.map(c => (
//             <CourseCard key={c.course._id} course={c.course} />
//           ))}
//         </div>
//       ) : (
//         <div className="card text-center p-6">
//           <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
//           <h3 className="text-xl font-semibold">No Active Courses</h3>
//           <p>Enroll to begin learning</p>
//           <Button className="gradient-primary">Explore Courses</Button>
//         </div>
//       )}
//     </div>
//   )
// }



"use client";
import useSWR from "swr";
import { RefreshCcw, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/students/courseCard";
import { Card, CardContent } from "@/components/ui/card";

const fetcher = (url: string) => fetch(url, { credentials: "include" }).then(r => r.json());

const MyCoursesTab = ({ user }) => {
  const { data, error, isLoading, mutate } = useSWR(
    user?._id ? `/api/enrollments?studentId=${user._id}` : null,
    fetcher,
    { revalidateOnFocus: true }
  );

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">Failed to load courses</p>;

  const courses = data?.enrollments || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">My Courses ({courses.length})</h2>

        <Button variant="outline" onClick={() => mutate()}>
          <RefreshCcw className="w-4 h-4" />
        </Button>
      </div>

      {courses.length ? (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course: any) => (
            <CourseCard key={course._id} course={course.course} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-10 w-10 mx-auto text-indigo-500" />
            <p className="text-gray-600 mt-2">No active courses yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyCoursesTab;


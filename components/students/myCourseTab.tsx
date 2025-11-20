


// "use client";

// import { BookOpen, Zap } from "lucide-react";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { useAuth } from "@/components/auth-provider";
// import { Skeleton } from "../ui/skeleton";
// import useSWR from "swr";
// import {CourseCard} from "@/components/students/Course";

// type Course = {
//   _id: string;
//   slug: string;
//   title: string;
//   status?: string;
//   price: number;
//   originalPrice?: number;
//   duration?: string;
//   features?: string[];
//   timeline?: string[];
//   enrollments?: number;
//   rating?: number;
//   progress?: number;

// };

// const fetcher = (url: string) =>
//   fetch(url, { credentials: "include", cache: "no-store" }).then((res) => res.json());

// const MyCoursesTab = () => {
//   const { user } = useAuth();

//   const { data, error, isLoading, mutate } = useSWR(
//     user ? `/api/enrollments/list?studentId=${user._id}` : null,
//     fetcher
//   );

//   const courses: Course[] = (data?.courses || []).map((course: any) => ({
//     _id: course._id,
//     slug: course.slug,
//     title: course.title,
//     status: course.status || "In Progress",
//     price: course.price,
//     originalPrice: course.originalPrice,
//     duration: course.duration,
//     features: course.features,
//     timeline: course.timeline,
//     enrollments: course.maxStudents || 100,
//     rating: course.rating,
//     progress: Math.floor(Math.random() * 100),
//   }));

//   if (isLoading) return <Skeleton className="h-48 w-full" />;
//   if (error) return <p className="text-red-500 text-center py-10">{error.message || "Something went wrong"}</p>;

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">
//           My Enrolled Courses ({courses.length})
//         </h2>
//         <div className="gap-4 flex">
//           <Button variant="outline" onClick={() => mutate()}>
//             <Zap className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//           <Button variant="outline">
//             <BookOpen className="h-4 w-4 mr-2" />
//             Explore Catalog
//           </Button>
//         </div>
//       </div>

//       {courses.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:grid-cols-2">
//           {courses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))}
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-6 text-center space-y-3">
//             <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
//             <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
//             <p className="text-gray-500">
//               It looks like you haven't started any courses yet. Enroll in a new course to begin your journey!
//             </p>
//             <Button className="gradient-primary">Explore New Courses</Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default MyCoursesTab;


"use client";

import { BookOpen, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/components/auth-provider";
import { Skeleton } from "../ui/skeleton";
import useSWR from "swr";
import { CourseCard } from "@/components/students/Course";

type Course = {
  _id: string;
  slug: string;
  title: string;
  status?: string;
  price: number;
  originalPrice?: number;
  duration?: string;
  features?: string[];
  timeline?: string[];
  enrollments?: number;
  rating?: number;
  progress?: number;
};

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store", // ⛔ never cache
  });

  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
};

export default function MyCoursesTab() {
  const { user } = useAuth();

  const { data, error, isLoading, mutate } = useSWR(
    user ? `/api/enrollments/list?studentId=${user._id}` : null,
    fetcher,
    {
      revalidateOnFocus: true,      // browser tab focus → refresh
      revalidateOnReconnect: true,  // network reconnect → refresh
      dedupingInterval: 0,          // ⛔ no dedupe → always fresh
      shouldRetryOnError: true,
    }
  );

  const courses: Course[] = (data?.courses || []).map((course: any) => ({
    _id: course._id,
    slug: course.slug,
    title: course.title,
    status: course.status || "In Progress",
    price: course.price,
    originalPrice: course.originalPrice,
    duration: course.duration,
    features: course.features,
    timeline: course.timeline,
    enrollments: course.maxStudents || 100,
    rating: course.rating,
    progress: 70, // 🔒 fixed progress to avoid re-rendering chaos
  }));

  if (isLoading)
    return <Skeleton className="h-48 w-full" />;

  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        {error.message || "Something went wrong"}
      </p>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          My Enrolled Courses ({courses.length})
        </h2>

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => mutate(null, { revalidate: true })}
          >
            <Zap className="h-4 w-4 mr-2" />
            Refresh
          </Button>

          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" />
            Explore Catalog
          </Button>
        </div>
      </div>

      {/* Course List */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center space-y-3">
            <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
            <p className="text-gray-500">
              You haven't enrolled in any courses yet.
            </p>
            <Button className="gradient-primary">Explore New Courses</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}




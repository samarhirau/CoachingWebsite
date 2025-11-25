




// "use client";

// import { BookOpen, Zap } from "lucide-react";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { useAuth } from "@/components/auth-provider";
// import { Skeleton } from "../ui/skeleton";
// import useSWR from "swr";
// import { useEffect } from "react";
// import { CourseCard } from "@/components/students/Course";

// const fetcher = async (url: string) => {
//   const res = await fetch(url, {
//     credentials: "include",
//     cache: "no-store",
//   });

//   if (!res.ok) throw new Error("Failed to load data");
//   return res.json();
// };

// export default function MyCoursesTab({ refreshFlag }: { refreshFlag: boolean }) {
//   const { user } = useAuth();

//   const {
//     data,
//     error,
//     isLoading,
//     mutate,
//   } = useSWR(
//     user ? `/api/enrollments/list?studentId=${user._id}` : null,
//     fetcher,
//     {
//       revalidateOnFocus: true,
//       revalidateOnReconnect: true,
//       dedupingInterval: 0,
//     }
//   );

//   // 🔥 Refresh whenever dashboard toggles refreshFlag
//   useEffect(() => {
//     if (user) mutate(); // force fresh fetch
//   }, [refreshFlag, user, mutate]);

//   const courses = (data?.courses || []).map((course: any) => ({
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
//     progress: 70,
//   }));

//   if (isLoading)
//     return <Skeleton className="h-48 w-full" />;

//   if (error)
//     return (
//       <p className="text-red-500 text-center py-10">
//         {error.message || "Something went wrong"}
//       </p>
//     );

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">
//           My Enrolled Courses ({courses.length})
//         </h2>

//         <div className="flex gap-4">
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

//       {/* Courses */}
//       {courses.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <CourseCard key={course._id} course={course} />
//           ))}
//         </div>
//       ) : (
//         <Card>
//           <CardContent className="p-6 text-center space-y-3">
//             <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
//             <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
//             <p className="text-gray-500">You haven’t enrolled in any courses yet.</p>
//             <Button className="gradient-primary">Explore Courses</Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }



"use client";

import { BookOpen, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAuth } from "@/components/auth-provider";
import { Skeleton } from "../ui/skeleton";
import useSWR from "swr";
import { useEffect } from "react";
import { CourseCard } from "@/components/students/Course";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to load data");
  return res.json();
};

export default function MyCoursesTab({ refreshFlag }: { refreshFlag: boolean }) {
  const { user } = useAuth();

  const canFetch = user && user._id;

  const { data, error, isLoading, mutate } = useSWR(
    canFetch ? `/api/enrollments/list?studentId=${user._id}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      dedupingInterval: 0,
    }
  );

  useEffect(() => {
    if (canFetch) mutate();
  }, [refreshFlag, canFetch, mutate]);

  if (!user) return <Skeleton className="h-48 w-full" />;

  if (isLoading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((n) => (
          <Skeleton key={n} className="h-48 w-full" />
        ))}
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center py-10">
        Failed to load courses
      </p>
    );

  const courses = (data?.courses || []).map((course: any) => ({
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
    progress: 70,
  }));

  return (
    <div className="space-y-6">

      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          My Enrolled Courses ({courses.length})
        </h2>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => mutate()}>
            <Zap className="h-4 w-4 mr-2" /> Refresh
          </Button>

          <Button variant="outline">
            <BookOpen className="h-4 w-4 mr-2" /> Explore Catalog
          </Button>
        </div>
      </div>

      {/* Courses Grid - Responsive */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center space-y-3">
            <Zap className="h-10 w-10 text-indigo-500 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800">No Active Courses</h3>
            <p className="text-gray-500">You haven’t enrolled in any courses yet.</p>
            <Button className="gradient-primary">Explore Courses</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


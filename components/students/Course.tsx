// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowRight, Clock, Star, PlayCircle } from "lucide-react";
// import Link from "next/link";

// type Props = {
//   course: {
//     _id: string;
//     slug: string;
//     title: string;
//     duration?: string;
//     rating?: number;
//     progress?: number;
//     status?: string;
//     features?: string[];
//   };
// };

// export const CourseCard = ({ course }: Props) => {
//   const progress = course.progress || 0;

//   return (
//     <Card className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl">
//       <div className="p-5 space-y-4">
//         <div className="flex justify-between items-start">
//           <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
//             {course.title}
//           </h3>
//           {course.status && (
//             <Badge variant="secondary" className="text-xs px-2 py-1">
//               {course.status}
//             </Badge>
//           )}
//         </div>

//         <div className="flex justify-between text-sm text-gray-500">
//           <div className="flex items-center gap-1">
//             <Clock className="h-4 w-4" />
//             {course.duration || "Self-paced"}
//           </div>
//           {course.rating && (
//             <div className="flex items-center gap-1">
//               <Star className="h-4 w-4 text-yellow-500" />
//               {course.rating}
//             </div>
//           )}
//         </div>

//         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-indigo-500 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>

//         <div className="text-sm font-medium text-gray-700">
//           Progress: {progress}%
//         </div>

//         {course.features && (
//           <div className="flex flex-wrap gap-2">
//             {course.features.slice(0, 3).map((f, i) => (
//               <Badge key={i} variant="outline" className="text-xs">
//                 {f}
//               </Badge>
//             ))}
//           </div>
//         )}

//         <Link href={`/course/${course.slug}`}>
//           <Button className="w-full rounded-xl gradient-primary flex items-center gap-2">
//             Continue Learning
//             <PlayCircle className="h-4 w-4" />
//           </Button>
//         </Link>
//       </div>
//     </Card>
//   );
// };

"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  course: {
    _id: string;
    slug: string;
    title: string;
    duration?: string;
    rating?: number;
    progress?: number;
    status?: string;
    category?: string;
    features?: string[];
    timeline?: { _id: string; month: string; focus?: string }[];
  };
};

export const CourseCard = ({ course }: Props) => {
  const [loading, setLoading] = useState(false);


  const progress = course.progress || 0;

  const categoryColorMap: Record<string, string> = {
    Marketing: "bg-orange-100 text-orange-700",
    Design: "bg-pink-100 text-pink-700",
    Programming: "bg-emerald-100 text-emerald-700",
    Business: "bg-blue-100 text-blue-700",
  };

  const categoryStyle =
    categoryColorMap[course.category || ""] ||
    "bg-gray-100 text-gray-600";

  return (
    <Card className="rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <CardContent className="flex flex-col p-6 gap-5 flex-1">

        {course.category && (
          <Badge
            className={`rounded-full px-4 py-1 text-xs font-semibold tracking-wide ${categoryStyle}`}
          >
            {course.category}
          </Badge>
        )}

        <h3 className="font-semibold text-lg md:text-xl text-gray-900 leading-tight line-clamp-2">
          {course.title}
        </h3>

        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration || "Self-paced"}
          </div>

          {course.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {course.rating}
            </div>
          )}
        </div>

        <div className="space-y-2">
  <div className="flex justify-between text-sm font-medium text-gray-700">
    <span>Progress</span>
    <span>{progress}%</span>
  </div>

  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="absolute top-0 left-0 h-full gradient-primary rounded-full transition-all duration-[1200ms] ease-out"
      style={{ width: `${progress}%` }}
    />

    {/* Progress text in bar */}
    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white drop-shadow-sm">
      {progress > 8 && `${progress}%`}
    </span>
  </div>

  {/* Optional label */}
  <p className="text-xs text-gray-500 mt-1">
    {progress >= 100 ? "Completed 🎉" : "Keep going!"}
  </p>
</div>


        {/* Timeline */}
        <div className="space-y-3 flex-1">
          {course.timeline?.slice(0, 4).map((item, idx) => (
            <div key={item._id} className="relative pl-5">
              <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary"></div>
              {idx !== course.timeline.length - 1 && (
                <div className="absolute left-[3px] top-3 w-[2px] h-11 bg-primary"></div>
              )}
              <p className="text-sm font-semibold text-gray-800">{item.month}</p>
              <p className="text-xs text-gray-500">{item.focus}</p>
            </div>
          ))}
        </div>

        {/* Button always at bottom */}
        {/* <Link href={`/course/${course.slug}`} className="mt-auto">
          <Button className="w-full rounded-xl flex items-center justify-center gap-2 bg-primary  py-5 text-base font-medium transition">
            <PlayCircle className="h-5 w-5" />
            Continue Learning
          </Button>
        </Link> */}
         <Link
      href={`/course/${course.slug}`}
      onClick={() => setLoading(true)}
      className="mt-auto"
    >
      <Button
        disabled={loading}
        className="w-full rounded-xl flex items-center justify-center gap-2 bg-primary py-5 text-base font-medium transition"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <PlayCircle className="h-5 w-5" />
        )}

        {loading ? "Loading..." : "Continue Learning"}
      </Button>
    </Link>
      </CardContent>
    </Card>
  );
};

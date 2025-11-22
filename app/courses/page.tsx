

// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { Card, CardContent, CardHeader } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Clock, Users, Star, ArrowRight, ArrowLeft, TrendingUp, BookOpen, Target } from "lucide-react"
// import Link from "next/link"
// import { EnrollmentModal } from "@/components/enrollment-modal"
// import {
//   Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu,
//   PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase
// } from "lucide-react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { ModernNavigation } from "@/components/modern-navigation"

// export default function CoursesPage() {
//   const initialLimit = 4
//   const loadMoreCount = 4

//   const [courses, setCourses] = useState<any[]>([])
//   const [visibleCourses, setVisibleCourses] = useState<any[]>([])
//   const [selectedCourse, setSelectedCourse] = useState<any>(null)
//   const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [filterMode, setFilterMode] = useState("all")
//   const [filterLevel, setFilterLevel] = useState("all")
//   const [isLoadingMore, setIsLoadingMore] = useState(false)


//   const benefits = [
//   {
//     icon: <Target className="h-6 w-6 text-primary" />,
//     title: "Hands-On Learning",
//     description:
//       "Learn through real-world projects and case studies for practical experience.",
//   },
//   {
//     icon: <Users className="h-6 w-6 text-primary" />,
//     title: "Expert Instructors",
//     description:
//       "Courses taught by professionals with proven industry experience.",
//   },
//   {
//     icon: <TrendingUp className="h-6 w-6 text-primary" />,
//     title: "Career Growth",
//     description:
//       "Gain the skills and confidence needed to move ahead in your career.",
//   },
//   {
//     icon: <BookOpen className="h-6 w-6 text-primary" />,
//     title: "Flexible Learning",
//     description:
//       "Access the course materials anytime, anywhere at your own pace.",
//   },
// ]


//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("/api/course/list")
//         const data = await res.json()
//         if (data.success) {
//           const mappedCourses = data.courses.map((course: any, index: number) => ({
//             ...course,
//             icon: [Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu, PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase][index % 16],
//           }))
//           setCourses(mappedCourses)
//           setVisibleCourses(mappedCourses.slice(0, initialLimit))
//         }
//       } catch (err) {
//         console.error("Failed to fetch courses", err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [])

// const filteredCourses = useMemo(() => {
//   return courses.filter((course) => {
//     const matchesSearch =
//       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       course.description.toLowerCase().includes(searchQuery.toLowerCase())

//     const matchesMode = filterMode === "all" || course.mode === filterMode
//     const matchesLevel =
//       filterLevel === "all" ||
//       course.level?.toLowerCase().includes(filterLevel.toLowerCase())

//     return matchesSearch && matchesMode && matchesLevel
//   })
// }, [courses, searchQuery, filterMode, filterLevel])


//   // const handleLoadMore = () => {
//   //   setVisibleCourses((prev) => {
//   //     const nextCount = prev.length + loadMoreCount
//   //     return filteredCourses.slice(0, nextCount)
//   //   })
//   // }
//   const handleLoadMore = async () => {
//   setIsLoadingMore(true)
//   await new Promise((resolve) => setTimeout(resolve, 800)) // just for UX delay
//   setVisibleCourses((prev) => {
//     const nextCount = prev.length + loadMoreCount
//     return courses.slice(0, nextCount)
//   })
//   setIsLoadingMore(false)
// }


//   const handleEnrollClick = (course: any) => {
//     setSelectedCourse(course)
//     setIsEnrollmentOpen(true)
//   }

//   useEffect(() => {
//     setVisibleCourses(filteredCourses.slice(0, initialLimit))
//   }, [filteredCourses])

//   return (
//     <main className="min-h-screen ">

//       { /* Navigation Bar */}
//     <ModernNavigation />
//       {/* Hero Section */}
// <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
//   <div className="max-w-7xl mx-auto text-center">
//     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
//       Explore <span className="text-primary">Professional Courses</span>
//     </h1>
//     <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
//       Learn from industry experts and upgrade your skills with our high-quality, affordable, and flexible learning programs designed for all levels.
//     </p>
//     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//       <Button size="lg">
//         Enroll Now
//         <ArrowRight className="ml-2 h-5 w-5" />
//       </Button>
//       <Button size="lg" variant="outline">
//         View All Programs
//       </Button>
//     </div>
//   </div>
// </section>

// {/* Benefits Section */}
// <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
//   <div className="max-w-7xl mx-auto">
//     <div className="text-center mb-12">
//       <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
//         Why Choose Our Courses?
//       </h2>
//       <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
//         We offer modern, practical, and flexible courses that help you build the right skills for your dream career.
//       </p>
//     </div>

//     {/* Benefits Grid */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//       {benefits.map((benefit, index) => (
//         <div
//           key={index}
//           className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
//         >
//           <div className="mb-4">{benefit.icon}</div>
//           <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
//           <p className="text-muted-foreground text-sm">{benefit.description}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//       <div className="max-w-7xl mx-auto py-5 px-4">

        

//         {/* --- Search & Filter Controls --- */}
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
//           <Input
//             placeholder="Search courses..."
//             className="w-full md:w-1/2"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//           <div className="flex gap-3 w-full md:w-auto">
//             <Select value={filterMode} onValueChange={setFilterMode}>
//               <SelectTrigger className="w-36">
//                 <SelectValue placeholder="Filter by Mode" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Modes</SelectItem>
//                 <SelectItem value="ONLINE">Online</SelectItem>
//                 <SelectItem value="OFFLINE">Offline</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={filterLevel} onValueChange={setFilterLevel}>
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Filter by Level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Levels</SelectItem>
//                 <SelectItem value="Beginner">Beginner</SelectItem>
//                 <SelectItem value="Intermediate">Intermediate</SelectItem>
//                 <SelectItem value="Advanced">Advanced</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {loading && courses.length === 0 ? (
//             Array.from({ length: 4 }).map((_, idx) => (
//               <Card key={idx} className="border-0 shadow-lg overflow-hidden">
//                 <div className="h-2 bg-gradient-to-r" />
//                 <CardHeader className="pb-4">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <Skeleton className="h-6 w-48 mb-2" />
//                       <Skeleton className="h-5 w-24" />
//                     </div>
//                     <div className="text-right">
//                       <Skeleton className="h-8 w-20 mb-1" />
//                       <Skeleton className="h-5 w-16" />
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <Skeleton className="h-4 w-full" />
//                   <Skeleton className="h-4 w-5/6" />
//                   <Skeleton className="h-4 w-2/3" />
//                   <div className="space-y-2">
//                     <Skeleton className="h-5 w-32 mb-2" />
//                     <div className="grid grid-cols-2 gap-2">
//                       {Array.from({ length: 4 }).map((_, idx) => (
//                         <Skeleton key={idx} className="h-4 w-full" />
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex gap-3 pt-2">
//                     <Skeleton className="h-10 flex-1" />
//                     <Skeleton className="h-10 flex-1" />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           ) : visibleCourses.length === 0 ? (
//             <div className="col-span-2 text-center text-gray-500 mt-8">
//               No courses found for your search/filter.
//             </div>
//           ) : (
//             visibleCourses.map((course, index) => (
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
//                        <Badge variant="outline" className="mt-1 capitalize">
//   {course.level}
// </Badge>

//                         <Badge
//                           className={`${course.mode === "ONLINE"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                             } px-2 py-1 text-xs rounded ml-2.5`}
//                         >
//                           {course.mode}
//                         </Badge>
//                       </div>
//                     </div>
//                     <div className="text-right flex-col flex mb-4 space-x-1">
//                       <div className="flex space-x-2 items-baseline">
//                         <div className="text-2xl font-bold text-primary">₹{course.price}</div>
//                         <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
//                       </div>
//                       {course.originalPrice > course.price && (
//                         <div className="text-sm text-green-600 font-semibold mb-1">
//                           Save ₹{course.originalPrice - course.price}
//                         </div>
//                       )}
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
//                       {course.studentsCount || 0} enrolled
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                       {course.rating}
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <h4 className="font-semibold text-sm">What you'll learn:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {course.features.map((feature: string, idx: number) => (
//                         <div key={idx} className="flex items-center gap-2 text-sm">
//                           <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                           {feature}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex gap-3 pt-2">
//                     <Button className="flex-1 gradient-primary group" onClick={() => handleEnrollClick(course)}>
//                       {course.enrolled ? "Continue" : "Enroll Now"}
//                       <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                     <Button asChild variant="outline" className="flex-1 bg-transparent">
//                       <Link href={`/courses/${course.slug}`}>Learn More</Link>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </div>

//         {visibleCourses.length < filteredCourses.length && (
//           <div className="text-center mt-10">
//             <Button
//   onClick={handleLoadMore}
//   size="lg"
//   variant="outline"
//   disabled={isLoadingMore}

// >
//   {isLoadingMore ? (
//     <>
//       <span className="h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
//       Loading...
//     </>
//   ) : (
//     "Load More Courses"
//   )}
// </Button>

//           </div>
//         )}
//       </div>

//       <EnrollmentModal
//         isOpen={isEnrollmentOpen}
//         onClose={() => setIsEnrollmentOpen(false)}
//         course={selectedCourse}
//       />
//     </main>
//   )
// }



"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Users, Star, ArrowRight, TrendingUp, BookOpen, Target, LucideIcon } from "lucide-react"
import Link from "next/link"
import { EnrollmentModal } from "@/components/enrollment-modal"
import {
    Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu,
    PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ModernNavigation } from "@/components/modern-navigation"

// --- Icons Array for Course Mapping ---
const CourseIcons: LucideIcon[] = [
    Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu,
    PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase
];

// --- Interface and Memoized CourseCard Component (Kept for performance) ---
interface Course {
    id: string | number;
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    level: string;
    mode: 'ONLINE' | 'OFFLINE';
    duration: string;
    studentsCount: number;
    rating: number;
    features: string[];
    slug: string;
    color: string;
    icon: LucideIcon;
    enrolled: boolean;
}

interface CourseCardProps {
    course: Course;
    handleEnrollClick: (course: Course) => void;
}

const CourseCard = React.memo<CourseCardProps>(({ course, handleEnrollClick }) => {
    return (
        <Card
            key={course.id} 
            className="group relative border border-transparent rounded-3xl shadow-[0_3px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur"
        >
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30" />

            <CardHeader className="pb-1">
                <div className="flex justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-sm">
                            <course.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold leading-tight">{course.title}</h3>
                            <div className="flex flex-wrap gap-2 mt-1.5">
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 capitalize">
                                    {course.level}
                                </Badge>

                                <Badge
                                    className={`text-xs px-2 py-0.5 rounded capitalize ${
                                        course.mode === "ONLINE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {course.mode.toLowerCase()}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">₹{course.price}</div>
                        <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>

                        {course.originalPrice > course.price && (
                            <div className="text-xs text-green-500 font-medium mt-0.5">
                                Save ₹{course.originalPrice - course.price}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5 mt-3">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {course.description}
                </p>

                <div className="flex items-center gap-5 text-xs text-muted-foreground">
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

                <div>
                    <h4 className="text-sm font-medium mb-1">What you’ll learn:</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {course.features.slice(0, 4).map((feature: string, idx: number) => (
                            <div key={idx} className="text-xs flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:brightness-110 transition-all group"
                        onClick={() => handleEnrollClick(course)}
                    >
                        {course.enrolled ? "Continue" : "Enroll Now"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 rounded-xl border-primary/20 hover:bg-primary/5"
                    >
                        <Link href={`/courses/${course.slug}`}>Learn More</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
});

CourseCard.displayName = 'CourseCard';

// --- Main Component ---
export default function CoursesPage() {
    const loadMoreCount = 4;

    // 'courses' now holds ALL loaded courses matching current filters
    const [courses, setCourses] = useState<Course[]>([]); 
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
    
    // Server Pagination States
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0); 
    const [totalFilteredCount, setTotalFilteredCount] = useState(0); 
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [filterMode, setFilterMode] = useState("all");
    const [filterLevel, setFilterLevel] = useState("all");

    // --- Debounce Effect ---
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300); 

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    // --- Core Data Fetching Function ---
    const fetchDataChunk = useCallback(async (currentOffset: number, shouldAppend: boolean = false) => {
        
        // Show the skeleton loader on initial load or filter/search change
        if (!shouldAppend) {
            setLoading(true);
        } else {
            setIsLoadingMore(true);
        }

        // Simulate API call with server parameters
        const params = new URLSearchParams({
            limit: String(loadMoreCount),
            offset: String(currentOffset),
            search: debouncedSearchQuery,
            mode: filterMode,
            level: filterLevel,
        });

        // Simulate network delay for UX and testing pagination
        await new Promise((resolve) => setTimeout(resolve, shouldAppend ? 300 : 500));

        try {
            // Replace with your actual fetch call:
            const res = await fetch(`/api/course/list?${params.toString()}`); 
            const data = await res.json();
            
            if (data.success) {
                // ASSUMPTION: API returns { success: true, courses: [...], totalCount: N }
                const newCourses = data.courses.map((course: any, index: number) => ({
                    ...course,
                    id: course.id || course._id || `${currentOffset + index}`, 
                    icon: CourseIcons[index % CourseIcons.length],
                })) as Course[];

                setTotalFilteredCount(data.totalCount || 0); 

                if (shouldAppend) {
                    setCourses((prev) => [...prev, ...newCourses]); // Append for "Load More"
                } else {
                    setCourses(newCourses); // Replace for new search/filter
                }
            }
        } catch (err) {
            console.error("Failed to fetch courses", err);
            // Optionally handle error state
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    }, [debouncedSearchQuery, filterMode, filterLevel, loadMoreCount]);


    // --- Effect 1: Trigger initial fetch or re-fetch when filters/search change ---
    useEffect(() => {
        // Only run if we aren't currently loading more (to avoid double-fetching)
        if (!isLoadingMore) {
            setCourses([]); // Clear current list visually
            setOffset(0); // Reset pagination offset
            fetchDataChunk(0, false); // Fetch the first chunk (offset 0), don't append
        }
    }, [debouncedSearchQuery, filterMode, filterLevel]); // eslint-disable-line react-hooks/exhaustive-deps


    // --- Effect 2: Trigger fetch when offset changes (i.e., on Load More click) ---
    useEffect(() => {
        // Fetch if offset > 0 (meaning handleLoadMore was clicked)
        if (offset > 0) { 
            fetchDataChunk(offset, true); // Fetch the new chunk, append results
        }
    }, [offset]); // eslint-disable-line react-hooks/exhaustive-deps


    // --- Handler for Load More Button ---
    const handleLoadMore = () => {
        // Increment offset by the loadMoreCount
        const nextOffset = offset + loadMoreCount;
        setOffset(nextOffset);
        // The fetch is triggered by the useEffect listening to 'offset'
    };


    const handleEnrollClick = (course: Course) => {
        setSelectedCourse(course)
        setIsEnrollmentOpen(true)
    }

   

    return (
        <main className="min-h-screen">

            { /* Navigation Bar (Omitted for brevity) */}
            <ModernNavigation />
            {/* Hero Section (Omitted for brevity) */}
            {/* Benefits Section (Omitted for brevity) */}

            <div className="max-w-7xl mx-auto py-12 px-4">

                {/* --- Search & Filter Controls --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <Input
                        placeholder="Search courses..."
                        className="w-full md:w-1/2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    {/* ... Select components (Omitted for brevity) ... */}
                    <div className="flex gap-3 w-full md:w-auto">
                         <Select value={filterMode} onValueChange={setFilterMode}>
                            <SelectTrigger className="w-36">
                                <SelectValue placeholder="Filter by Mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Modes</SelectItem>
                                <SelectItem value="ONLINE">Online</SelectItem>
                                <SelectItem value="OFFLINE">Offline</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterLevel} onValueChange={setFilterLevel}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Filter by Level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Levels</SelectItem>
                                <SelectItem value="Beginner">Beginner</SelectItem>
                                <SelectItem value="Intermediate">Intermediate</SelectItem>
                                <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Skeleton Loader: Show if we are loading the initial set (offset 0) */}
                    {(loading && courses.length === 0) ? (
                        Array.from({ length: 4 }).map((_, idx) => (
                            <Card key={idx} className="border-0 shadow-lg overflow-hidden">
                                <div className="h-2 bg-gradient-to-r" />
                                <CardHeader className="pb-4"> {/* ... skeleton content ... */}
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
                    ) : courses.length === 0 ? (
                        <div className="col-span-2 text-center text-gray-500 mt-8">
                            No courses found for your search/filter.
                        </div>
                    ) : (
                        // Map over all loaded courses
                        courses.map((course) => (
                            <CourseCard
                                key={course.id} 
                                course={course}
                                handleEnrollClick={handleEnrollClick}
                            />
                        ))
                    )}
                </div>

                {/* --- Load More Button (Now uses totalFilteredCount) --- */}
                {courses.length < totalFilteredCount && (
                    <div className="text-center mt-10">
                        <Button
                            onClick={handleLoadMore}
                            size="lg"
                            variant="outline"
                            disabled={isLoadingMore}
                        >
                            {isLoadingMore ? (
                                <>
                                    <span className="h-4 w-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin mr-2" />
                                    Loading...
                                </>
                            ) : (
                                "Load More Courses"
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <EnrollmentModal
                isOpen={isEnrollmentOpen}
                onClose={() => setIsEnrollmentOpen(false)}
                course={selectedCourse}
            />
        </main>
    )
}

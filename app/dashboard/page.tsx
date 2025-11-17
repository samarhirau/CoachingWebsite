// "use client";
// import StudentDashboard  from "@/components/student-dashboard"
// import { useAuth } from "@/components/auth-provider";
// import  SkeletonDashboard  from "@/components/skeletonDashboard";
// import { ModernNavigation } from "@/components/modern-navigation";


// export default function DashboardPage() {

//   const { user , loading } = useAuth();

// if (loading) 
//   return <SkeletonDashboard />;

//   const StudentDashboardAny = StudentDashboard as any;

//   return <>
//         <ModernNavigation />
//          <StudentDashboardAny user={user}/>
//   </>
// }

"use client"
import dynamic from "next/dynamic"
import { useAuth } from "@/components/auth-provider"
import SkeletonDashboard from "@/components/skeletonDashboard"
import { ModernNavigation } from "@/components/modern-navigation"

const StudentDashboard = dynamic(() => import("@/components/student-dashboard"), {
  loading: () => <SkeletonDashboard />,
})

export default function DashboardPage() {
  const { user, loading } = useAuth()
  if (loading) return <SkeletonDashboard />
  return (
    <>
      <ModernNavigation />
      <StudentDashboard user={user} />
    </>
  )
}


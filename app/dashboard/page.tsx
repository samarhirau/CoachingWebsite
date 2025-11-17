"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/components/auth-provider";
import SkeletonDashboard from "@/components/skeletonDashboard";
import { ModernNavigation } from "@/components/modern-navigation";

const StudentDashboard = dynamic(
  () => import("@/components/student-dashboard"),
  { ssr: false, loading: () => <SkeletonDashboard /> }
);

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <SkeletonDashboard />;
  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <ModernNavigation />
      <StudentDashboard user={user} />
    </>
  );
}

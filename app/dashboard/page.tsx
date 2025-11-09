"use client";
import StudentDashboard  from "@/components/student-dashboard"
import { useEffect } from "react";

export default function DashboardPage() {

  useEffect(() => {
  const hasRefreshed = sessionStorage.getItem("dashboardRefreshed");

  if (!hasRefreshed) {
    sessionStorage.setItem("dashboardRefreshed", "true");
    window.location.reload(); 
  }
}, []);

  return <StudentDashboard />
}

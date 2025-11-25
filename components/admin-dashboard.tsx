"use client";
import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
import { Home, Users, BookOpen, DollarSign, ListChecks, Mail as MailIcon, BarChart, Zap, GraduationCap, Bell, IndianRupee } from "lucide-react";
import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { DashboardOverview } from "@/components/admin/dashboardOverview";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Lazy Loaded Components
const AllStudentsView = lazy(() => import("@/components/admin/allStudentsView"));
const AddStudentForm = lazy(() => import("@/components/admin/addStudentForm"));
const EditStudentForm = lazy(() => import("@/components/admin/editstudentForm"));
const AllCoursesView = lazy(() => import("@/components/admin/allCourseView"));
const AddCourseForm = lazy(() => import("@/components/admin/addCourseForm"));
const AddAssignmentForm = lazy(() => import("@/components/admin/addAssignmentForm"));
const ReviewAssignmentsView = lazy(() => import("@/components/admin/reviewAssignmentsView"));
const FeesCollectionView = lazy(() => import("@/components/admin/feesCollectionView"));
const FeesReceiptView = lazy(() => import("@/components/admin/feesRecipView"));
const NewsletterListView = lazy(() => import("@/components/admin/newsletterListView"));
const QuickActionListView = lazy(() => import("@/components/admin/quickActionView"));
const ContactListView = lazy(() => import("@/components/admin/contactListView"));

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pageTitle, setPageTitle] = useState("Dashboard");

  const { data: studentList = [] } = useSWR("/api/students", fetcher, { fallbackData: [] });
  const { data: courseList = [] } = useSWR("/api/courses", fetcher, { fallbackData: [] });
  const { data: assignmentList = [] } = useSWR("/api/assignments", fetcher, { fallbackData: [] });
const { data: totalFeesData } = useSWR<{ totalFees: number }>("/api/fees/total", fetcher, { fallbackData: { totalFees: 0 } });

  const menuStructure = [
    { title: "Dashboard", section: "dashboard", icon: Home, submenu: [] },
    { title: "Students", section: "students", icon: Users, submenu: ["All Students", "Add Student", "Edit Student"] },
    { title: "Courses", section: "courses", icon: BookOpen, submenu: ["All Courses", "Add Course", "Edit Course"] },
    { title: "Fees", section: "fees", icon: DollarSign, submenu: ["Fees Collection", "Fees Receipt"] },
    { title: "Assignments", section: "assignments", icon: ListChecks, submenu: ["Add Assignment", "Review Assignments"] },
    { title: "Reports", section: "reports", icon: BarChart, submenu: [] },
    { title: "Newsletter", section: "Newsletter", icon: MailIcon, submenu: [] },
    { title: "Quick Actions", section: "quick-actions", icon: Zap, submenu: [] },
    { title: "Contacts", section: "Contacts", icon: Zap, submenu: [] },
  ];

  const handleToggleMenu = useCallback((section: string) => setOpenMenu(prev => (prev === section ? null : section)), []);
  const handleSetSection = useCallback((s: string) => { setActiveSection(s); setPageTitle(s.split("/").pop() || "Dashboard"); }, []);

const dynamicStatsData = useMemo(() => [
  { title: "Total Students", value: studentList.length, icon: Users, color: "bg-indigo-500" },
  { title: "Total Assignments", value: assignmentList.length, icon: ListChecks, color: "bg-yellow-500" },
  { title: "Total Courses", value: courseList.length, icon: BookOpen, color: "bg-green-500" },
  { title: "Fees Collection", value: totalFeesData?.totalFees || 0, icon: IndianRupee  , color: "bg-red-500", prefix: "₹" },
], [studentList.length, assignmentList.length, courseList.length, totalFeesData?.totalFees]);


  const renderContent = useCallback(() => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview stats={dynamicStatsData} studentList={studentList}  />;
      case "students/All Students": return <Suspense fallback="Loading Students..."><AllStudentsView /></Suspense>;
      case "students/Add Student": return <Suspense fallback="Loading Form..."><AddStudentForm /></Suspense>;
      case "students/Edit Student": return <Suspense fallback="Loading Form..."><EditStudentForm /></Suspense>;
      case "courses/All Courses": return <Suspense fallback="Loading Courses..."><AllCoursesView data={courseList} /></Suspense>;
      case "courses/Add Course": return <Suspense fallback="Loading Form..."><AddCourseForm /></Suspense>;
      case "assignments/Add Assignment": return <Suspense fallback="Loading Form..."><AddAssignmentForm /></Suspense>;
      case "assignments/Review Assignments": return <Suspense fallback="Loading..."><ReviewAssignmentsView /></Suspense>;
      case "fees/Fees Collection": return <Suspense fallback="Loading..."><FeesCollectionView /></Suspense>;
      case "fees/Fees Receipt": return <Suspense fallback="Loading..."><FeesReceiptView /></Suspense>;
      case "Newsletter": return <Suspense fallback="Loading..."><NewsletterListView /></Suspense>;
      case "quick-actions": return <Suspense fallback="Loading..."><QuickActionListView /></Suspense>;
      case "Contacts": return <Suspense fallback="Loading..."><ContactListView /></Suspense>;
      default: return <div>404: Page Not Found</div>;
    }
  }, [activeSection, studentList, courseList, dynamicStatsData]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar menuStructure={menuStructure} activeSection={activeSection} setActiveSection={handleSetSection} openMenu={openMenu} handleToggleMenu={handleToggleMenu} isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(prev => !prev)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}






"use client";

import React, { useState, Suspense, lazy, useCallback } from "react";
import { Bell, MessageSquare } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import LogoutConfirmation from "@/components/logout-btn";
import SkeletonDashboard from "@/components/skeletonDashboard";
import { ModernNavigation } from "./modern-navigation";

// Lazy load tabs
const OverviewTab = lazy(() => import("./students/overviewTab"));
const MyCoursesTab = lazy(() => import("./students/myCourseTab"));
const AssignmentsTab = lazy(() => import("./students/assignmentTab"));
const ProgressTab = lazy(() => import("./students/progressTab"));
const SubmissionModal = lazy(() => import("./students/submissionModal"));



const MOCK_ASSIGNMENTS = [
  {
    id: "a1",
    title: "Build a Todo App",
    dueDate: "Jan 24, 2025",
    status: "pending",
    difficulty: "Medium",
    progress: 0,
    submissionContent: null,
  },
  {
    id: "a2",
    title: "Create REST API",
    dueDate: "Jan 28, 2025",
    status: "pending",
    difficulty: "Hard",
    progress: 0,
    submissionContent: null,
  },
  {
    id: "a3",
    title: "Portfolio Website",
    dueDate: "Jan 18, 2025",
    status: "completed",
    difficulty: "Easy",
    progress: 100,
    score: "92%",
    submissionContent: "Initial commit of portfolio website.",
  },
];

// Tabs config
const TABS = [
  { value: "overview", label: "Overview", component: OverviewTab },
  { value: "courses", label: "My Courses", component: MyCoursesTab },
  { value: "assignments", label: "Assignments", component: AssignmentsTab },
  { value: "progress", label: "Progress", component: ProgressTab },
];

const ButtonCustom = ({ children, variant = "default", size = "default", onClick, className = "", disabled }) => {
  let baseStyle = "font-medium rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";
  let sizeStyle = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";
  let colorStyle = variant === "outline"
    ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
    : "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <button className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleAssignmentSubmit = useCallback((assignmentId, submissionContent) => {
    // Optimistic UI: update assignment locally
    setSelectedAssignment(null);
  }, []);

  if (loading && user) return <SkeletonDashboard />;

  const ActiveTabComponent = TABS.find(tab => tab.value === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
     <ModernNavigation />
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ButtonCustom variant="outline" size="sm"><Bell className="h-4 w-4 mr-2" /> Notifications</ButtonCustom>
            <ButtonCustom variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-2" /> Support</ButtonCustom>
            <LogoutConfirmation />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex justify-start border-b border-gray-200 grid w-full grid-cols-4">
            {TABS.map(tab => (
              <button
                key={tab.value}
                className={`px-4 py-3 text-base font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab.value ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <Suspense fallback={<SkeletonDashboard />}>
            {ActiveTabComponent && (
            <ActiveTabComponent
  assignments={MOCK_ASSIGNMENTS} // or preloaded assignments from API
/>

            )}
          </Suspense>
        </div>
      </div>

      {/* Modals */}
      {selectedAssignment && (
        <Suspense fallback={null}>
          <SubmissionModal
            assignment={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
            onSubmit={handleAssignmentSubmit}
          />
        </Suspense>
      )}
    </div>
  );
}
























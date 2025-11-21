"use client";

import React, { useState, useCallback } from "react";
import { Bell, MessageSquare } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import LogoutConfirmation from "@/components/logout-btn";
import {ModernNavigation} from "@/components/modern-navigation";
import { Button } from "@/components/ui/button";
import OverviewTab from "@/components/students/overviewTab"; 
import MyCoursesTab from "@/components/students/myCourseTab";
import AssignmentsTab from "@/components/students/assignmentTab";
import ProgressTab from "@/components/students/progressTab";
import SubmissionModal from "@/components/students/submissionModal";  



const TABS = [
  { value: "overview", label: "Overview", component: OverviewTab },
  { value: "courses", label: "My Courses", component: MyCoursesTab },
  { value: "assignments", label: "Assignments", component: AssignmentsTab },
  { value: "progress", label: "Progress", component: ProgressTab },
];

const MOCK_ASSIGNMENTS = [
  { id: "a1", title: "Build a Todo App", dueDate: "Jan 24, 2025", status: "pending", progress: 0, submissionContent: null },
  { id: "a2", title: "Create REST API", dueDate: "Jan 28, 2025", status: "pending", progress: 0, submissionContent: null },
  { id: "a3", title: "Portfolio Website", dueDate: "Jan 18, 2025", status: "completed", progress: 100, submissionContent: "Initial commit" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);

  // Update assignment progress
  const updateAssignment = useCallback((id: string, updates: any) => {
    setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  }, []);

  const handleAssignmentSubmit = (id: string, content: string) => {
    updateAssignment(id, { submissionContent: content, status: "submitted", progress: 100 });
    setSelectedAssignment(null);
  };


  if (!user) return <p className="absolute top-1/2 left-1/2">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <ModernNavigation />

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name}!</h1>
              <p className="text-sm text-gray-400 ">- {user?.email}</p>
              </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm"><Bell className="h-4 w-4 mr-2" /> Notifications</Button>
            <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-2" /> Support</Button>
            <LogoutConfirmation />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 grid grid-cols-4">
          {TABS.map(tab => (
            <button
              key={tab.value}
              className={`px-4 py-3 text-base font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.value
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {TABS.map(tab => (
          <div key={tab.value} className={`${activeTab === tab.value ? "block" : "hidden"} pt-6`}>
            {tab.value === "assignments" && (
              <AssignmentsTab assignments={assignments} updateAssignment={updateAssignment} />
            )}
            {tab.value === "progress" && <ProgressTab assignments={assignments} />}
            {tab.value === "courses" && (
              <MyCoursesTab refreshFlag={false} />
            )}
            {tab.value === "overview" && <OverviewTab />}
          </div>
        ))}
      </main>

      {selectedAssignment && (
        <SubmissionModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onSubmit={handleAssignmentSubmit}
        />
      )}
    </div>
  );
}

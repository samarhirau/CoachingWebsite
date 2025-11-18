"use client";
import React, { useState, useCallback } from "react";
import { MessageSquare, Bell } from "lucide-react";
import LogoutConfirmation from "@/components/logout-btn";
import SubmissionModal from "./students/submissionModal";
import AssignmentsTab from "./students/assignmentTab";
import OverviewTab from "./students/overviewTab";
import MyCoursesTab from "./students/myCourseTab";
import ProgressTab from "./students/progressTab";
import { Button } from "@/components/ui/button";

const TABS = [
  { value: "overview", label: "Overview", component: OverviewTab },
  { value: "courses", label: "My Courses", component: MyCoursesTab },
  { value: "assignments", label: "Assignments", component: AssignmentsTab },
  { value: "progress", label: "Progress", component: ProgressTab },
];

export default function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // 🔄 Flag to trigger course refresh in child
  const [refreshCourses, setRefreshCourses] = useState(false);

  const handleEnroll = () => {
    // After successful enrollment
    setRefreshCourses(prev => !prev); // toggle to trigger SWR mutate
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" /> Support
            </Button>
            <LogoutConfirmation />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 border-b border-gray-200">
          {TABS.map(tab => (
            <button
              key={tab.value}
              className={`px-4 py-3 text-base font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.value
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {TABS.map(
            tab =>
              activeTab === tab.value && (
                <tab.component
                  key={tab.value}
                  user={user}
                  refreshFlag={refreshCourses} // pass refresh trigger
                  onEnroll={handleEnroll} // optional for enroll actions
                />
              )
          )}
        </div>
      </main>

      {selectedAssignment && (
        <SubmissionModal
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}

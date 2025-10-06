"use client";
import React, { useState, useCallback, useEffect } from "react";
import { MessageSquare, Bell } from "lucide-react";
import { ModernNavigation } from "./modern-navigation";
import { useAuth } from "@/components/auth-provider";
import LogoutConfirmation from "@/components/logout-btn";
import SubmissionModal from "./students/submissionModal";
import AssignmentsTab from "./students/assignmentTab";
import OverviewTab from "./students/overviewTab";
import MyCoursesTab from "./students/myCourseTab";
import ProgressTab from "./students/progressTab";

// Mock Data for Assignments
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

const Button = ({
  children,
  variant = "default",
  size = "default",
  onClick,
  className = "",
  disabled,
}) => {
  let baseStyle =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";
  let sizeStyle = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";
  let colorStyle = "";
  switch (variant) {
    case "outline":
      colorStyle =
        "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
      break;
    case "destructive":
      colorStyle = "bg-red-600 text-white hover:bg-red-700";
      break;
    case "success":
      colorStyle = "bg-green-600 text-white hover:bg-green-700";
      break;
    default:
      colorStyle = className.includes("gradient-primary")
        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700"
        : "bg-indigo-600 text-white hover:bg-indigo-700";
      break;
  }
  return (
    <button
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const TABS = [
  { value: "overview", label: "Overview", component: OverviewTab },
  { value: "courses", label: "My Courses", component: MyCoursesTab },
  { value: "assignments", label: "Assignments", component: AssignmentsTab },
  { value: "progress", label: "Progress", component: ProgressTab },
];

export default function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Function to update an assignment in local state
  const updateAssignment = useCallback((id, updates) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id ? { ...assignment, ...updates } : assignment
      )
    );
  }, []);

  // Handle assignment submission from modal
  const handleAssignmentSubmit = (assignmentId, submissionContent) => {
    updateAssignment(assignmentId, {
      submissionContent,
      status: "submitted",
      progress: 100,
    });
    setSelectedAssignment(null);
  };

  if (!user) return <p className="absolute top-1/2 left-1/2">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <ModernNavigation />
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, {user.name}!
              </h1>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Tabs Header */}
          <div className="flex justify-start border-b border-gray-200 grid w-full grid-cols-4">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-3 text-base font-medium transition-colors duration-200 border-b-2 ${
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

          {/* Tabs Content */}
          {TABS.map((tab) => (
            <div
              key={tab.value}
              className={`pt-6 ${activeTab === tab.value ? "block" : "hidden"}`}
            >
              {tab.value === "assignments" && (
                <AssignmentsTab
                  assignments={assignments}
                  updateAssignment={updateAssignment}
                />
              )}
              {tab.value === "progress" && (
                <ProgressTab assignments={assignments} />
              )}
              {tab.value === "courses" && <MyCoursesTab />}

              {tab.value === "overview" && <OverviewTab />}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {/* <SubmissionModal assignment={undefined} onClose={undefined} onSubmit={undefined} /> */}
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

// import React, { useState, useCallback } from "react";
// import { MessageSquare, Bell } from "lucide-react";
// import { ModernNavigation } from "./modern-navigation";
// import { useAuth } from "@/components/auth-provider";

// import LogoutConfirmation from "@/components/logout-btn";
// import SubmissionModal from "./students/submissionModal";
// import AssignmentsTab from "./students/assignmentTab";
// import OverviewTab from "./students/overviewTab";
// import MyCoursesTab from "./students/myCourseTab";
// import ProgressTab from "./students/progressTab";

// // --- Global Constants (Mock Data) ---

// // Mock Data for Assignments - Now with sequential IDs
// const MOCK_ASSIGNMENTS = [
//   {
//     id: "a1",
//     title: "Build a Todo App",
//     dueDate: "Jan 24, 2025",
//     status: "pending",
//     difficulty: "Medium",
//     progress: 0,
//     submissionContent: null,
//   },
//   {
//     id: "a2",
//     title: "Create REST API",
//     dueDate: "Jan 28, 2025",
//     status: "pending",
//     difficulty: "Hard",
//     progress: 0,
//     submissionContent: null,
//   },
//   {
//     id: "a3",
//     title: "Portfolio Website",
//     dueDate: "Jan 18, 2025",
//     status: "completed",
//     difficulty: "Easy",
//     progress: 100,
//     score: "92%",
//     submissionContent: "Initial commit of portfolio website.",
//   },
// ];

// const Button = ({
//   children,
//   variant = "default",
//   size = "default",
//   onClick,
//   className = "",
//   disabled,
// }) => {
//   let baseStyle =
//     "font-medium rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed";
//   let sizeStyle = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";
//   let colorStyle = "";

//   switch (variant) {
//     case "outline":
//       colorStyle =
//         "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50";
//       break;
//     case "destructive":
//       colorStyle = "bg-red-600 text-white hover:bg-red-700";
//       break;
//     case "success":
//       colorStyle = "bg-green-600 text-white hover:bg-green-700";
//       break;
//     default: // default/primary
//       colorStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
//       if (className.includes("gradient-primary")) {
//         colorStyle =
//           "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700";
//       }
//       break;
//   }
//   return (
//     <button
//       className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}
//       onClick={onClick}
//       disabled={disabled}
//     >
//       {children}
//     </button>
//   );
// };

// <>
//   <>
//     <SubmissionModal
//       assignment={undefined}
//       onClose={undefined}
//       onSubmit={undefined}
//     />
//     <AssignmentsTab
//       assignments={MOCK_ASSIGNMENTS}
//       updateAssignment={undefined}
//     />
//     <OverviewTab />
//   </>
//   <>
//     <MyCoursesTab />
//     <ProgressTab assignments={MOCK_ASSIGNMENTS} />
//   </>
// </>;

// // --- MAIN APP COMPONENT ---

// const TABS = [
//   { value: "overview", label: "Overview", component: OverviewTab },
//   { value: "courses", label: "My Courses", component: MyCoursesTab },
//   { value: "assignments", label: "Assignments", component: AssignmentsTab },
//   { value: "progress", label: "Progress", component: ProgressTab },
// ];

// export default function App() {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);

//   // Central function to update an assignment in local state
//   const updateAssignment = useCallback((id, updates) => {
//     setAssignments((prevAssignments) =>
//       prevAssignments.map((assignment) =>
//         assignment.id === id ? { ...assignment, ...updates } : assignment
//       )
//     );
//   }, []);

//   // Custom Tabs component to replace shadcn/ui Tabs
//   const TabsList = ({ children, className }) => (
//     <div className={`flex justify-start border-b border-gray-200 ${className}`}>
//       {children}
//     </div>
//   );

//   const TabsTrigger = ({ value, children }) => (
//     <button
//       className={`px-4 py-3 text-base font-medium transition-colors duration-200 border-b-2
//               ${
//                 activeTab === value
//                   ? "border-indigo-600 text-indigo-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//       onClick={() => setActiveTab(value)}
//     >
//       {children}
//     </button>
//   );

//   const TabsContent = ({ value, children }) => (
//     <div className={`pt-6 ${activeTab === value ? "block" : "hidden"}`}>
//       {children}
//     </div>
//   );
//   const { user } = useAuth();

//   if (!user) return <p className="absolute top-1/2 left-1/2">Loading...</p>;
//   return (
//     <div className="min-h-screen bg-gray-50 font-inter">
//       {/* Header */}
//       <ModernNavigation />
//       <div className="bg-white border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold text-lg">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   Welcome back, {user.name}!
//                 </h1>
//                 {/* <p className="text-gray-500 text-sm">
//                   {STUDENT_DATA.course} • {STUDENT_DATA.batch}
//                 </p> */}
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="flex justify-end mb-6 gap-3">
//                 <Button variant="outline" size="sm">
//                   <Bell className="h-4 w-4 mr-2" />
//                   Notifications
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <MessageSquare className="h-4 w-4 mr-2" />
//                   Support
//                 </Button>

//                 {/* <Button
//     onClick={handleLogout}
//     variant="outline"
//     variant = "outline" size='sm'
//   >
//     <LogOut className="w-4 h-4 mr-2" />
//     Logout
//   </Button> */}

//                 <LogoutConfirmation />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4">
//             {TABS.map((tab) => (
//               <TabsTrigger key={tab.value} value={tab.value}>
//                 {tab.label}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {TABS.map((tab) => (
//             <TabsContent key={tab.value} value={tab.value}>
//               {/* Pass assignments state and update function to relevant tabs */}
//               {tab.value === "assignments" && (
//                 <AssignmentsTab
//                   assignments={assignments}
//                   updateAssignment={updateAssignment}
//                 />
//               )}
//               {tab.value === "progress" && (
//                 <ProgressTab assignments={assignments} />
//               )}
//               {tab.value !== "assignments" &&
//                 tab.value !== "progress" &&
//                 React.createElement(tab.component)}
//             </TabsContent>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"
import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react'
import useSWR from 'swr' // 🌟 New: Import useSWR for data fetching and caching
import {
  Home, Users, BookOpen, DollarSign, ListChecks, Mail, BarChart, Zap, GraduationCap, Mail as MailIcon, Bell, ChevronsDown, ChevronsUp, Trash2, Edit
} from 'lucide-react'

// --- Lazy Loaded Components ---
const QuickActionListView = lazy(() => import('@/components/admin/quickActionView'))
const NewsletterListView = lazy(() => import('@/components/admin/newsletterListView'))
const GenericManagementView = lazy(() => import('@/components/admin/genericManagementView'))
const AllStudentsView = lazy(() => import('@/components/admin/allStudentsView'))
const AddStudentForm = lazy(() => import('./admin/addStudentForm'))
const EditStudentForm = lazy(() => import('./admin/editstudentForm'))
const FeesCollectionView = lazy(() => import('./admin/feesCollectionView'))
const AllCoursesView = lazy(() => import('./admin/allCourseView'))
const AddCourseForm = lazy(() => import('./admin/addCourseForm'))
const AddAssignmentForm = lazy(() => import('./admin/addAssignmentForm'))
const ReviewAssignmentsView = lazy(() => import('./admin/reviewAssignmentsView'))
const FeesReceiptView = lazy(() => import('./admin/feesRecipView'))




// --- Interfaces (Definitions remain the same) ---
interface Student {
  id: number
  rollNo: string
  name: string
  education: string
  mobile: string
  email: string
  admissionDate: string
  status: 'Checkin' | 'Pending' | 'Canceled'
  assignedProfessor: string
  subject: string
  fees: string
  profileImage: string
}

interface Course {
  id: number
  name: string
  code: string
  duration: string
  professor: string
  studentsCount: number
  image: string
}

interface DashboardStats {
  title: string
  value: number
  icon: React.ElementType
  color: string
  prefix?: string
}

// --- SWR Fetcher and Custom Hooks (Performance Improvement) ---
const fetcher = (url: string) => fetch(url).then(res => res.json())

// Custom hooks to manage fetching and caching
const useStudents = () => useSWR<Student[]>('/api/students?limit=5', fetcher, { fallbackData: [] });
const useCourses = () => useSWR<Course[]>('/api/courses', fetcher, { fallbackData: [] });
const useAssignments = () => useSWR<any[]>('/api/assignments', fetcher, { fallbackData: [] });

// --- Component Data/Structure ---
const menuStructure = [
  { title: 'Dashboard', section: 'dashboard', icon: Home, submenu: [] },
  { title: 'Students', section: 'students', icon: Users, submenu: ['All Students', 'Add Student', 'Edit Student'] },
  { title: 'Courses', section: 'courses', icon: BookOpen, submenu: ['All Courses', 'Add Course', 'Edit Course'] },
  { title: 'Fees', section: 'fees', icon: DollarSign, submenu: ['Fees Collection', 'Fees Receipt'] },
  { title: 'Assignments', section: 'assignments', icon: ListChecks, submenu: ['Add Assignment', 'Review Assignments'] },
  { title: 'Reports', section: 'reports', icon: BarChart, submenu: [] },
  { title: 'Newslatter', section: 'Newslatter', icon: MailIcon, submenu: [] },
  { title: 'Quick Actions', section: 'quick-actions', icon: Zap, submenu: [] },
]

// --- StatCard Component (Memoized) ---
const StatCard: React.FC<{ stat: DashboardStats }> = React.memo(({ stat }) => {
  const Icon = stat.icon
  return (
    <div className={`p-5 rounded-xl shadow-lg text-white ${stat.color} transition duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{stat.title}</h3>
        <Icon className="w-8 h-8 opacity-75" />
      </div>
      <div className="mt-2">
        <p className="text-4xl font-bold">
          {stat.prefix}
          {stat.value.toLocaleString()}
        </p>
        <p className="text-sm mt-1 opacity-90">30% Increase in 30 Days</p>
      </div>
    </div>
  )
})

// --- SidebarLink Component (Memoized) ---
const SidebarLink: React.FC<{
  title: string
  section: string
  icon: React.ElementType
  activeSection: string
  setActiveSection: (s: string) => void
  submenu?: string[]
  isOpen?: boolean
  onToggle?: () => void
}> = React.memo(({ title, section, icon: Icon, activeSection, setActiveSection, submenu, isOpen, onToggle }) => {
  const isActive = activeSection.startsWith(section)
  return (
    <div>
      <div
        className={`flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer transition duration-150 ${
          isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => (submenu && submenu.length > 0 ? onToggle && onToggle() : setActiveSection(section))}
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-3" />
          <span className="font-medium">{title}</span>
        </div>
        {submenu && submenu.length > 0 && (isOpen ? <ChevronsUp className="w-4 h-4" /> : <ChevronsDown className="w-4 h-4" />)}
      </div>
      {submenu && submenu.length > 0 && isOpen && (
        <ul className="pl-6 pt-1 border-l-2 border-indigo-400 ml-3">
          {submenu.map(subItem => (
            <li
              key={subItem}
              className={`py-1.5 px-3 text-sm cursor-pointer rounded-md transition duration-100 ${
                activeSection === `${section}/${subItem}` ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-500 hover:text-indigo-500'
              }`}
              onClick={() => setActiveSection(`${section}/${subItem}`)}
            >
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

// --- DashboardOverview Component (Memoized) ---
const DashboardOverview: React.FC<{ stats: DashboardStats[]; studentList: Student[] }> = React.memo(({ stats, studentList }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} stat={stat} /> 
      ))}
    </div>

    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <MailIcon className="w-5 h-5 mr-2 text-indigo-500" /> Quick Mail Sender
        </h3>
        <input type="text" placeholder="To: email@example.com" className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
        <input type="text" placeholder="Subject" className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
        <textarea placeholder="Message Body..." rows={5} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none" />
        <div className="flex items-center justify-between">
          <input type="file" id="file-upload" className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
          <button className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-150">Send Mail</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-red-500" /> Exam Toppers (Edit)
        </h3>
        <ul className="space-y-3">
          {['Ramesh Kumar (501)', 'Priya Sharma (502)', 'Amit Singh (503)', 'Sneha Varma (504)'].map((topper, index) => (
            <li key={index} className="flex items-center justify-between border-b pb-2 last:border-b-0">
              <span className="text-gray-700">{topper}</span>
              <button className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-150">Edit Score</button>
            </li>
          ))}
        </ul>
      </div>
    </div>

<div className="bg-white shadow-sm rounded-xl overflow-hidden">
  { 
     studentList.length === 0 ? (
    <div className="text-center py-12 text-gray-500">
      <p className="text-lg font-medium">No students found</p>
      <p className="text-sm">Try changing search or filters</p>
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
          <tr>
            <th className="px-6 py-3 text-left">Roll No.</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Registered</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {studentList
            .slice(-8) 
            .map((student: any) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">up{shortId(student._id)}</td>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">{student.phone || "-"}</td>
                <td className="px-6 py-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button title="Edit" className="text-blue-500 hover:text-blue-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button title="Delete" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )}
</div>


  </div>
))

// --- Main AdminDashboard Component ---
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null)


  // Example total fees calculation (could be fetched from an API)
// const { data: feesData = [] } = useSWR<{ amount: number }[]>('/api/fees?limit=1000', fetcher, { fallbackData: [] });

  const { data: studentList = [], isLoading: studentsLoading } = useStudents();
  const { data: assignmentList = [], isLoading: assignmentsLoading } = useAssignments();
  const { data: courseList = [], isLoading: coursesLoading } = useCourses();
  
  // Handlers wrapped in useCallback to prevent unnecessary re-renders in children
  const handleToggleMenu = useCallback((section: string) => setOpenMenu(prev => (prev === section ? null : section)), [])
  const handleSetSection = useCallback((s: string) => setActiveSection(s), [])
// const totalFees = useMemo(() => feesData.reduce((sum, fee) => sum + fee.amount, 0), [feesData]);
  // Dynamic stats wrapped in useMemo to only recalculate when dependencies change
const dynamicStatsData = useMemo(() => [
  { title: 'Total Students', value: studentList.length, icon: Users, color: 'bg-indigo-500' },
  { title: 'Total Assignments', value: assignmentList.length, icon: ListChecks, color: 'bg-yellow-500' },
  { title: 'Total Courses', value: courseList.length, icon: BookOpen, color: 'bg-green-500' },
  { title: 'Fees Collection', value: "55", icon: DollarSign, color: 'bg-red-500', prefix: '$' },
], [studentList.length, assignmentList.length, courseList.length, ]);

  // Content rendering logic wrapped in useCallback
  const renderContent = useCallback(() => {
    // Show a loading state if the critical dashboard data is still loading
    if (studentsLoading || coursesLoading || assignmentsLoading) {
        if (activeSection === 'dashboard') {
            return <div className="p-6 text-center text-indigo-600 text-xl font-semibold">Loading Dashboard Data...</div>;
        }
    }
    
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview stats={dynamicStatsData} studentList={studentList} />
      case 'students/All Students':
        return (
          <Suspense fallback={<div>Loading Students View...</div>}>
            <AllStudentsView />
          </Suspense>
        )
      case 'students/Add Student':
        return (
          <Suspense fallback={<div>Loading Form...</div>}>
            <AddStudentForm />
          </Suspense>
        )
      case 'students/Edit Student':
        return (
          <Suspense fallback={<div>Loading Form...</div>}>
            <EditStudentForm />
          </Suspense>
        )
      case 'courses/All Courses':
        return (
          <Suspense fallback={<div>Loading Courses View...</div>}>
            {/* Pass courseList directly to AllCoursesView (assuming it accepts data prop) */}
            <AllCoursesView data={courseList} /> 
          </Suspense>
        )
      case 'courses/Add Course':
        return (
          <Suspense fallback={<div>Loading Form...</div>}>
            <AddCourseForm />
          </Suspense>
        )
      case 'courses/Edit Course':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <GenericManagementView section="Edit Course" />
          </Suspense>
        )
      case 'assignments/Add Assignment':
        return (
          <Suspense fallback={<div>Loading Form...</div>}>
            <AddAssignmentForm  />
          </Suspense>
        )
      case 'assignments/Review Assignments':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <ReviewAssignmentsView  />
          </Suspense>
        )
      case 'fees/Fees Collection':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <FeesCollectionView />
          </Suspense>
        )
      case 'fees/Fees Receipt':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <FeesReceiptView />
          </Suspense>
        )
      case 'Newslatter':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <NewsletterListView />
          </Suspense>
        )
      case 'quick-actions':
        return (
          <Suspense fallback={<div>Loading View...</div>}>
            <QuickActionListView />
          </Suspense>
        )
      default:
        return <div>404: Page Not Found</div>
    }
  }, [activeSection, studentList, courseList, studentsLoading, coursesLoading, assignmentsLoading])

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-300 ease-in-out w-64 bg-white shadow-xl z-20 flex flex-col rounded-tr-xl rounded-br-xl`}>
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-3xl font-extrabold text-indigo-700">Upcoder</h1>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuStructure.map(item => (
            <SidebarLink
              key={item.section}
              title={item.title}
              section={item.section}
              icon={item.icon}
              activeSection={activeSection}
              setActiveSection={handleSetSection}
              submenu={item.submenu}
              isOpen={openMenu === item.section}
              onToggle={() => handleToggleMenu(item.section)}
            />
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 text-sm text-center text-gray-500">© 2025 Upcoder. All Rights Reserved.</div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white shadow-md z-10">
          <button onClick={() => setIsSidebarOpen(prev => !prev)} className="text-gray-500 lg:hidden hover:text-indigo-600 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 hidden sm:block">{activeSection.split('/').pop() || 'Dashboard'}</h2>

          <div className="flex items-center space-x-4">
            <input type="search" placeholder="Search..." className="px-4 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 w-32 sm:w-64" />
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100"><MailIcon className="w-5 h-5" /></button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img className="h-9 w-9 rounded-full object-cover border-2 border-indigo-400" src="https://placehold.co/150x150/4f46e5/ffffff?text=AD" alt="Admin Profile" />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

function shortId(_id: any) {
  return _id.toString().slice(-5);
}







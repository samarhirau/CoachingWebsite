"use client"
import React, { useState, useMemo, useCallback } from 'react';
import {
  Home, Users, BookOpen, DollarSign, Briefcase, PlusCircle, Edit, ListChecks, Mail,
  ScrollText, BarChart, GraduationCap, ChevronsDown, ChevronsUp, HardHat, FileText,
  Bell, Trash2, Save, X, ClipboardCheck, CornerDownRight, FileSignature, CheckCircle
} from 'lucide-react';

// --- 1. TYPE DEFINITIONS & DUMMY DATA ---

interface Student {
  id: number;
  rollNo: string;
  name: string;
  education: string;
  mobile: string;
  email: string;
  admissionDate: string;
  status: 'Checkin' | 'Pending' | 'Canceled';
  assignedProfessor: string;
  subject: string;
  fees: string;
  profileImage?: string; // Added for the new UI
}

interface Course {
  id: number;
  name: string;
  code: string;
  duration: string;
  professor: string;
  studentsCount: number;
  image: string;
}

interface FeesReceiptItem {
  id: number;
  feesType: 'Annual Fees' | 'Tuition Fees';
  frequency: 'Monthly' | 'Yearly';
  invoiceNumber: string;
  date: string;
  amount: number;
}

// New Interface for Fees Collection View (Matching the Screenshot)
interface FeesCollectionItem {
    id: number;
    rollNo: string;
    studentName: string;
    invoiceNumber: string;
    feesType: 'Library' | 'Tuition' | 'Annual';
    paymentType: 'Cash' | 'Credit Card' | 'Cheque';
    status: 'Paid' | 'Pending' | 'Unpaid';
    date: string;
    amount: number;
}

interface DashboardStats {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  prefix?: string;
}

interface AssignmentSubmission {
  studentId: number;
  studentName: string;
  submittedDate: string;
  fileUrl: string; // Placeholder for file location
  status: 'Submitted' | 'Graded' | 'Missing';
  grade?: number | string;
  comments?: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  submissions: AssignmentSubmission[];
}


// --- INITIAL DUMMY DATA ---
const initialStudentList: Student[] = [
  { id: 1, rollNo: '01', name: 'Tiger Nixon', education: 'M.COM., P.H.D.', mobile: '123 456 7890', email: 'info@example.com', admissionDate: '2011/04/25', status: 'Checkin', assignedProfessor: 'Airi Satou', subject: 'Commerce', fees: '120$', profileImage: 'https://placehold.co/150x150/4f46e5/ffffff?text=TN' },
  { id: 2, rollNo: '02', name: 'Garrett Winters', education: 'B.COM., M.COM.', mobile: '987 654 3210', email: 'info@example.com', admissionDate: '2011/07/25', status: 'Pending', assignedProfessor: 'Angelica Ramos', subject: 'Mechanical', fees: '120$', profileImage: 'https://placehold.co/150x150/28a745/ffffff?text=GW' },
  { id: 3, rollNo: '03', name: 'Ashton Cox', education: 'B.COM., M.COM.', mobile: '(123) 4567 890', email: 'info@example.com', admissionDate: '2009/12/02', status: 'Canceled', assignedProfessor: 'Ashton Cox', subject: 'Science', fees: '520$', profileImage: 'https://placehold.co/150x150/ffc107/333333?text=AC' },
  { id: 4, rollNo: '04', name: 'Cedric Kelly', education: 'B.A., B.C.A.', mobile: '123 456 7890', email: 'info@example.com', admissionDate: '2012/03/29', status: 'Checkin', assignedProfessor: 'Cara Stevens', subject: 'Arts', fees: '220$', profileImage: 'https://placehold.co/150x150/17a2b8/ffffff?text=CK' },
  { id: 5, rollNo: '05', name: 'Airi Satou', education: 'B.A., B.C.A.', mobile: '987 654 3210', email: 'info@example.com', admissionDate: '2008/11/28', status: 'Checkin', assignedProfessor: 'Bruno Nash', subject: 'Maths', fees: '130$', profileImage: 'https://placehold.co/150x150/dc3545/ffffff?text=AS' },
  { id: 6, rollNo: '06', name: 'Brielle Williamson', education: 'B.COM., M.COM.', mobile: '123 456 7890', email: 'info@example.com', admissionDate: '2012/12/02', status: 'Checkin', assignedProfessor: 'Michelle House', subject: 'Physics', fees: '150$', profileImage: 'https://placehold.co/150x150/6f42c1/ffffff?text=BW' },
];

const initialFeesCollectionList: FeesCollectionItem[] = [
    { id: 1, rollNo: '01', studentName: 'Tiger Nixon', invoiceNumber: '#54805', feesType: 'Library', paymentType: 'Cash', status: 'Paid', date: '2011/04/25', amount: 120.00 },
    { id: 2, rollNo: '02', studentName: 'Garrett Winters', invoiceNumber: '#54687', feesType: 'Library', paymentType: 'Credit Card', status: 'Pending', date: '2011/07/25', amount: 120.00 },
    { id: 3, rollNo: '03', studentName: 'Ashton Cox', invoiceNumber: '#35672', feesType: 'Tuition', paymentType: 'Cash', status: 'Paid', date: '2009/12/02', amount: 520.00 },
    { id: 4, rollNo: '04', studentName: 'Cedric Kelly', invoiceNumber: '#57984', feesType: 'Annual', paymentType: 'Credit Card', status: 'Paid', date: '2012/03/29', amount: 280.00 },
    { id: 5, rollNo: '05', studentName: 'Airi Satou', invoiceNumber: '#12453', feesType: 'Library', paymentType: 'Cheque', status: 'Pending', date: '2008/11/28', amount: 130.00 },
    { id: 6, rollNo: '06', studentName: 'Brielle Williamson', invoiceNumber: '#59723', feesType: 'Tuition', paymentType: 'Cash', status: 'Paid', date: '2012/12/02', amount: 120.00 },
    { id: 7, rollNo: '07', studentName: 'Herrod Chandler', invoiceNumber: '#98726', feesType: 'Tuition', paymentType: 'Credit Card', status: 'Unpaid', date: '2012/08/06', amount: 120.00 },
    { id: 8, rollNo: '08', studentName: 'Rhona Davidson', invoiceNumber: '#98721', feesType: 'Library', paymentType: 'Cheque', status: 'Unpaid', date: '2010/10/14', amount: 120.00 },
];


const initialCourseList: Course[] = [
  { id: 1, name: 'When is the Best Time to Take an Education Course?', code: 'EC001', duration: '12 Months', professor: 'Jack Ronan', studentsCount: 450, image: 'https://placehold.co/400x200/007bff/ffffff?text=Course+1' },
  { id: 2, name: 'Education Courses: A Guide to Unlocking Your Potential', code: 'EC002', duration: '12 Months', professor: 'Jimmy Morris', studentsCount: 210, image: 'https://placehold.co/400x200/28a745/ffffff?text=Course+2' },
  { id: 3, name: 'A Comprehensive Guide to Taking an Education Course', code: 'EC003', duration: '12 Months', professor: 'Konne Backfield', studentsCount: 115, image: 'https://placehold.co/400x200/ffc107/333333?text=Course+3' },
];

const initialFeesReceipt: FeesReceiptItem[] = [
  { id: 1, feesType: 'Annual Fees', frequency: 'Monthly', invoiceNumber: '#54820', date: '8 August 2021', amount: 999.00 },
  { id: 2, feesType: 'Annual Fees', frequency: 'Yearly', invoiceNumber: '#54310', date: '7 August 2021', amount: 3000.00 },
  { id: 3, feesType: 'Tuition Fees', frequency: 'Monthly', invoiceNumber: '#24315', date: '6 August 2021', amount: 499.00 },
  { id: 4, feesType: 'Tuition Fees', frequency: 'Yearly', invoiceNumber: '#32541', date: '5 August 2021', amount: 3999.00 },
];

const initialAssignmentList: Assignment[] = [
    {
        id: 1,
        title: 'React Component Lifecycle',
        course: 'Advanced Web Dev',
        dueDate: '2024-11-15',
        description: 'Explain the three phases of the component lifecycle in a 500-word essay.',
        submissions: [
            { studentId: 1, studentName: 'Tiger Nixon', submittedDate: '2024-11-10', fileUrl: '#', status: 'Submitted', grade: undefined },
            { studentId: 4, studentName: 'Cedric Kelly', submittedDate: '2024-11-14', fileUrl: '#', status: 'Submitted', grade: undefined },
            { studentId: 3, studentName: 'Ashton Cox', submittedDate: '2024-11-12', fileUrl: '#', status: 'Graded', grade: 88, comments: 'Good structure, but missed a point on unmounting.' },
        ]
    },
    {
        id: 2,
        title: 'History of the Roman Empire',
        course: 'Ancient History 101',
        dueDate: '2024-12-01',
        description: 'Research and report on the causes of the decline of the Western Roman Empire.',
        submissions: [
            { studentId: 2, studentName: 'Garrett Winters', submittedDate: '2024-11-05', fileUrl: '#', status: 'Submitted', grade: undefined },
        ]
    }
];

const statsData: DashboardStats[] = [
    { title: 'Total Students', value: initialStudentList.length, icon: Users, color: 'bg-indigo-500', prefix: '' },
    { title: 'Total Assignments', value: initialAssignmentList.length, icon: ListChecks, color: 'bg-yellow-500', prefix: '' },
    { title: 'Total Courses', value: initialCourseList.length, icon: BookOpen, color: 'bg-green-500', prefix: '' },
    { title: 'Fees Collection', value: 25160, icon: DollarSign, color: 'bg-red-500', prefix: '$' },
];

// --- 2. REUSABLE COMPONENTS ---

// Card for displaying statistics on the dashboard
const StatCard: React.FC<{ stat: DashboardStats }> = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <div className={`p-5 rounded-xl shadow-lg text-white ${stat.color} transition duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{stat.title}</h3>
        <Icon className="w-8 h-8 opacity-75" />
      </div>
      <div className="mt-2">
        <p className="text-4xl font-bold">
          {stat.prefix}{stat.value.toLocaleString()}
        </p>
        <p className="text-sm mt-1 opacity-90">30% Increase in 30 Days</p>
      </div>
    </div>
  );
};

// Component to handle navigation link structure
const SidebarLink: React.FC<{
  title: string;
  section: string;
  icon: React.ElementType;
  activeSection: string;
  setActiveSection: (s: string) => void;
  submenu?: string[];
}> = ({ title, section, icon: Icon, activeSection, setActiveSection, submenu }) => {
  const isActive = activeSection.startsWith(section);
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div>
      <div
        className={`flex items-center justify-between p-3 my-1 rounded-lg cursor-pointer transition duration-150 ${
          isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => {
          if (submenu && submenu.length > 0) {
            setIsOpen(!isOpen);
          } else {
            setActiveSection(section);
          }
        }}
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
                activeSection === `${section}/${subItem}`
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : 'text-gray-500 hover:text-indigo-500'
              }`}
              onClick={() => setActiveSection(`${section}/${subItem}`)}
            >
              {subItem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// --- 3. VIEW COMPONENTS (CRUD) ---

// 3.1 All Students View (List with CRUD Actions) - Updated to match screenshot style
const AllStudentsView: React.FC<{ students: Student[]; onDelete: (id: number) => void }> = ({ students, onDelete }) => {
    // Note: Inline editing logic (isEditing, etc.) has been removed to match the screenshot's clean table look.
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const getStatusClass = (status: Student['status']) => {
        switch (status) {
            case 'Checkin': return 'bg-green-100 text-green-800 font-bold';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 font-bold';
            case 'Canceled': return 'bg-red-100 text-red-800 font-bold';
        }
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    {/* List/Grid View Tabs */}
                    <div className="flex space-x-2 border border-gray-300 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            List View
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
                                viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            Grid View
                        </button>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 hidden sm:block">All Students List</h2>
                    
                    <button onClick={() => console.log('Navigate to Add Student')} className='px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center'>
                        <PlusCircle className='w-4 h-4 mr-1' /> Add new
                    </button>
                </div>

                {/* Search and Entries */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                        Show
                        <select className="mx-2 p-1 border rounded-md bg-white">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        entries
                    </div>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>

                {/* Table Content */}
                {viewMode === 'list' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                                    {['Roll No.', 'Name', 'Education', 'Mobile', 'Email', 'Admission Date', 'Status', 'Actions'].map(header => (
                                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                className="h-9 w-9 rounded-full object-cover"
                                                src={student.profileImage || `https://placehold.co/150x150/4f46e5/ffffff?text=${student.rollNo}`}
                                                alt={student.name}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.education}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.mobile}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.admissionDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(student.status)}`}>
                                                {student.status === 'Checkin' ? 'Check-in' : student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className='flex space-x-2'>
                                                {/* Edit button is now a navigation placeholder */}
                                                <button title="Edit Student" className="text-indigo-600 hover:text-indigo-900 transition"><Edit className="w-4 h-4" /></button>
                                                <button title="Delete Student" onClick={() => onDelete(student.id)} className="text-red-600 hover:text-red-900 transition"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {viewMode === 'grid' && (
                    <div className="p-10 text-center text-gray-500">
                        <p className='text-lg font-semibold'>Grid View is a placeholder for a card layout of students.</p>
                        <p className='text-sm mt-2'>Please select 'List View' to see the student data.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// 3.2 Add Student Form (Create)
const AddStudentForm: React.FC<{ onAdd: (student: Omit<Student, 'id' | 'status' | 'profileImage'>) => void }> = ({ onAdd }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id' | 'status' | 'profileImage'>>({
        rollNo: '', name: '', education: '', mobile: '', email: '', admissionDate: new Date().toISOString().slice(0, 10), assignedProfessor: '', subject: '', fees: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API READY: Simulate POST request to /api/students/add
        onAdd(formData);
        // Reset form
        setFormData({ rollNo: '', name: '', education: '', mobile: '', email: '', admissionDate: new Date().toISOString().slice(0, 10), assignedProfessor: '', subject: '', fees: '' });
        // NOTE: Replacing alert with console log to follow modern web practice
        console.log('New student added successfully!');
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Student</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Student Enrollment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} placeholder="Admission Date" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Contact & Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Previous Education" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Current Subject/Stream" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Faculty & Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input type="text" name="assignedProfessor" value={formData.assignedProfessor} onChange={handleChange} placeholder="Assigned Professor" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="fees" value={formData.fees} onChange={handleChange} placeholder="Total Fees ($)" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-150 mt-4">
                    <PlusCircle className="w-5 h-5 inline mr-2" /> Enroll Student
                </button>
            </form>
        </div>
    );
};

// 3.3 Add Assignment Form (Create Assignment)
const AddAssignmentForm: React.FC<{ courses: Course[]; onAdd: (assignment: Omit<Assignment, 'id' | 'submissions'>) => void }> = ({ courses, onAdd }) => {
    const [formData, setFormData] = useState<Omit<Assignment, 'id' | 'submissions'>>({
        title: '', course: '', dueDate: new Date().toISOString().slice(0, 10), description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API READY: Simulate POST request to /api/assignments/add
        onAdd(formData);
        setFormData({ title: '', course: '', dueDate: new Date().toISOString().slice(0, 10), description: '' });
        console.log('New assignment published successfully!');
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Publish New Assignment</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Assignment Title (e.g., Chapter 5 Quiz)" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />

                    <select name="course" value={formData.course} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                        <option value="" disabled>Select Course</option>
                        {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                </div>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed Assignment Instructions & Requirements" rows={6} className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none" required />

                <button type="submit" className="w-full py-3 bg-indigo-500 text-white font-bold rounded-lg shadow-md hover:bg-indigo-600 transition duration-150 mt-4">
                    <FileSignature className="w-5 h-5 inline mr-2" /> Publish Assignment
                </button>
            </form>
        </div>
    );
};

// 3.4 Review Assignments View (Grade Submissions)
const ReviewAssignmentsView: React.FC<{ assignments: Assignment[]; onGrade: (assignmentId: number, studentId: number, grade: number | string, comments: string) => void }> = ({ assignments, onGrade }) => {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | 'all'>('all');
    const [gradingSubmission, setGradingSubmission] = useState<{ assignmentId: number; studentId: number } | null>(null);
    const [gradeData, setGradeData] = useState({ grade: '', comments: '' });

    const filteredAssignments = selectedAssignmentId === 'all'
        ? assignments
        : assignments.filter(a => a.id === selectedAssignmentId);

    const submissionsToReview = filteredAssignments.flatMap(a =>
        a.submissions.filter(s => s.status === 'Submitted').map(s => ({
            ...s,
            assignmentId: a.id,
            assignmentTitle: a.title,
            course: a.course
        }))
    );

    const handleGradeClick = (assignmentId: number, studentId: number) => {
        setGradingSubmission({ assignmentId, studentId });
        setGradeData({ grade: '', comments: '' });
    };

    const handleGradeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (gradingSubmission) {
            // API READY: Simulate PATCH request to update submission grade
            onGrade(
                gradingSubmission.assignmentId,
                gradingSubmission.studentId,
                gradeData.grade,
                gradeData.comments
            );
            setGradingSubmission(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Review Student Submissions</h2>

            <div className="flex justify-between items-center mb-6">
                <select
                    value={selectedAssignmentId}
                    onChange={(e) => setSelectedAssignmentId(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                    <option value="all">View All Assignments</option>
                    {assignments.map(a => <option key={a.id} value={a.id}>{a.title} ({a.course})</option>)}
                </select>
                <div className="text-gray-600 font-semibold">
                    <span className="text-indigo-600">{submissionsToReview.length}</span> Submissions Awaiting Review
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Assignment', 'Course', 'Student Name', 'Submitted On', 'File', 'Actions'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {submissionsToReview.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No submissions to review for the selected assignment.</td></tr>
                        ) : (
                            submissionsToReview.map(sub => (
                                <React.Fragment key={`${sub.assignmentId}-${sub.studentId}`}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{sub.assignmentTitle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sub.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.submittedDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 font-medium flex items-center">
                                                <CornerDownRight className='w-4 h-4 mr-1' /> View File
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleGradeClick(sub.assignmentId, sub.studentId)}
                                                className="flex items-center px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600 transition"
                                            >
                                                <ClipboardCheck className="w-4 h-4 mr-1" /> Grade
                                            </button>
                                        </td>
                                    </tr>
                                    {gradingSubmission?.assignmentId === sub.assignmentId && gradingSubmission.studentId === sub.studentId && (
                                        <tr>
                                            <td colSpan={6} className="bg-green-50 p-4 border-t-2 border-green-200">
                                                <form onSubmit={handleGradeSubmit} className="flex space-x-4 items-center">
                                                    <label className="flex items-center space-x-2 text-sm font-semibold text-green-800">
                                                        Grade (e.g., 95/100):
                                                        <input
                                                            type="text"
                                                            name="grade"
                                                            value={gradeData.grade}
                                                            onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                                                            required
                                                            className="p-1 border border-green-300 rounded-md w-32 focus:ring-green-500"
                                                        />
                                                    </label>
                                                    <label className="flex items-center space-x-2 text-sm font-semibold text-green-800 flex-grow">
                                                        Comments:
                                                        <input
                                                            type="text"
                                                            name="comments"
                                                            value={gradeData.comments}
                                                            onChange={(e) => setGradeData({ ...gradeData, comments: e.target.value })}
                                                            className="p-1 border border-green-300 rounded-md w-full focus:ring-green-500"
                                                        />
                                                    </label>
                                                    <button type="submit" className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-sm">
                                                        Submit Grade
                                                    </button>
                                                    <button type="button" onClick={() => setGradingSubmission(null)} className="text-red-600 hover:text-red-800">
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 3.5 Dashboard Overview (Existing)
const DashboardOverview: React.FC<{ stats: DashboardStats[]; studentList: Student[] }> = ({ stats, studentList }) => (
    <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
            ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Mail Sender (Existing) */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center"><Mail className="w-5 h-5 mr-2 text-indigo-500" /> Quick Mail Sender</h3>
                <input type="text" placeholder="To: email@example.com" className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="text" placeholder="Subject" className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                <textarea placeholder="Message Body..." rows={5} className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none" />
                <div className="flex items-center justify-between">
                    <input type="file" id="file-upload" className="block w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                    <button className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-150">Send Mail</button>
                </div>
            </div>

            {/* Quick Action: Exam Toppers Edit List (Existing) */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-red-500" /> Exam Toppers (Edit)</h3>
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

        {/* New Student List (Dashboard View) */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">New Student List (Latest Admissions)</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Roll No.', 'Name', 'Professor', 'Admit Date', 'Status', 'Fees'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {studentList.slice(-3).map(student => ( // Show last 3 added students
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.assignedProfessor}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.admissionDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        student.status === 'Checkin' ? 'bg-green-100 text-green-800' :
                                        student.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.fees}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3"><Edit className="w-4 h-4" /></button>
                                    <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// 3.6 New Fees Collection View (Implemented from screenshot)
const FeesCollectionView: React.FC<{ data: FeesCollectionItem[] }> = ({ data }) => {
    const getStatusClass = (status: FeesCollectionItem['status']) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-800 font-bold';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 font-bold';
            case 'Unpaid': return 'bg-red-100 text-red-800 font-bold';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Fees Collection</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-600">
                        Show
                        <select className="mx-2 p-1 border rounded-md bg-white">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        entries
                    </div>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['Roll No.', 'Student Name', 'Invoice Number', 'Fees Type', 'Payment Type', 'Status', 'Date', 'Amount', 'Actions'].map(header => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.rollNo}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.studentName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{item.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.feesType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.paymentType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">${item.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button title="View Receipt" className="text-blue-500 hover:text-blue-700 transition mr-2"><FileText className="w-4 h-4" /></button>
                                        <button title="Edit" className="text-indigo-500 hover:text-indigo-700 transition"><Edit className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// 3.7 Other Management Views (Existing)
const AllCoursesView: React.FC<{ data: typeof initialCourseList }> = ({ data }) => (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
            <img src={course.image} alt={course.name} className="w-full h-40 object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/400x200/4f46e5/ffffff?text=${course.code}` }} />
            <div className="p-5">
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{course.name}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> Duration: <span className="font-medium ml-1">{course.duration}</span></p>
                <p className="flex items-center"><HardHat className="w-4 h-4 mr-2" /> Professor: <span className="font-medium ml-1">{course.professor}</span></p>
                <p className="flex items-center"><Users className="w-4 h-4 mr-2" /> Students: <span className="font-medium ml-1">{course.studentsCount}</span></p>
              </div>
              <div className="mt-4 flex justify-between">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
// const AddCourseForm: React.FC = () => {
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log('API Integration: Submitting new course data...');
//         // NOTE: Replacing alert with console log
//         console.log('Course submission initiated (Check console for dummy API call)');
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Course</h2>
//             <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
//                 <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Course Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <input type="text" placeholder="Course Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="text" placeholder="Course Code (e.g., EC004)" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                 </div>
//                 <textarea placeholder="Course Description/Details" rows={5} className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none" required />

//                 <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Logistics</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <input type="text" placeholder="Start Date/Semester" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="text" placeholder="Course Duration (e.g., 6 Months)" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="number" placeholder="Course Price ($)" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="text" placeholder="Professor Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="number" placeholder="Maximum Students" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                     <input type="tel" placeholder="Contact Number" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
//                 </div>
//                 <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-150 mt-4">
//                     <PlusCircle className="w-5 h-5 inline mr-2" /> Add Course
//                 </button>
//             </form>
//         </div>
//     );
// };






interface TimelineItem {
  month: string
  focus: string
}

interface CourseFormData {
  title: string
  slug: string
  description: string
  duration: string
  price: number
  originalPrice: number
  rating: number
  professor: string
  maxStudents: number
  contactNumber: string
  features: string
  roadmap: string
  timeline: string
}

const AddCourseForm: React.FC = () => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    slug: "",
    description: "",
    duration: "",
    price: 0,
    originalPrice: 0,
    rating: 0,
    professor: "",
    maxStudents: 0,
    contactNumber: "",
    features: "",
    roadmap: "",
    timeline: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "price" || name === "originalPrice" || name === "rating" || name === "maxStudents"
          ? Number(value)
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      ...formData,
      features: formData.features.split(",").map(f => f.trim()),
      roadmap: formData.roadmap.split(",").map(f => f.trim()),
      timeline: formData.timeline
        .split(";")
        .map(item => {
          const [month, focus] = item.split("-")
          return { month: month?.trim(), focus: focus?.trim() }
        }),
    }

    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        console.error("Error creating course:", data.error)
        alert("Failed to add course")
      } else {
        console.log("Course created:", data)
        alert("Course added successfully!")
        setFormData({
          title: "",
          slug: "",
          description: "",
          duration: "",
          price: 0,
          originalPrice: 0,
          rating: 0,
          professor: "",
          maxStudents: 0,
          contactNumber: "",
          features: "",
          roadmap: "",
          timeline: "",
        })
      }
    } catch (err) {
      console.error("Server error:", err)
      alert("Server error")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Course</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Course Title e.g., Full Stack Web Development"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Enter the course name</p>
          </div>

          <div>
            <input
              type="text"
              name="slug"
              placeholder="Unique Slug e.g., full-stack-web"
              value={formData.slug}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">URL-friendly identifier for the course</p>
          </div>

          <div>
            <input
              type="number"
              name="price"
              placeholder="Discounted Price e.g., 45000"
              value={formData.price}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Enter discounted price in INR</p>
          </div>

          <div>
            <input
              type="number"
              name="originalPrice"
              placeholder="Original Price e.g., 60000"
              value={formData.originalPrice}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Original price before discount in INR</p>
          </div>

          <div>
            <input
              type="number"
              name="rating"
              placeholder="Course rating (0-5) e.g., 4.9"
              value={formData.rating}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Rating between 0 to 5</p>
          </div>

          <div>
            <input
              type="text"
              name="professor"
              placeholder="Professor / Instructor Name"
              value={formData.professor}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div>
            <input
              type="number"
              name="maxStudents"
              placeholder="Max Students e.g., 200"
              value={formData.maxStudents}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Set 0 for unlimited students</p>
          </div>

          <div>
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number e.g., 9876543210"
              value={formData.contactNumber}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="features"
              placeholder="Features / Highlights (comma-separated)"
              value={formData.features}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Example: React, Node, MongoDB</p>
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="roadmap"
              placeholder="Roadmap Steps (comma-separated)"
              value={formData.roadmap}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Example: Frontend, Backend, Deployment</p>
          </div>

          <div className="md:col-span-2">
            <input
              type="text"
              name="timeline"
              placeholder="Timeline (week-month format separated by semicolon) e.g., Month 1-React Basics;Month 2-Node.js"
              value={formData.timeline}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full"
            />
            <p className="text-sm text-gray-500 mt-1">Format: Month-Topic; Month-Topic</p>
          </div>

          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Course Description / Details"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 flex items-center justify-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" /> Add Course
        </button>
      </form>
    </div>
  )
}







const FeesReceiptView: React.FC<{ data: typeof initialFeesReceipt }> = ({ data }) => {
    const subtotal = useMemo(() => data.reduce((sum, item) => sum + item.amount, 0), [data]);
    const discount = subtotal * 0.20;
    const subtotalAfterDiscount = subtotal - discount;
    const vat = subtotalAfterDiscount * 0.10;
    const total = subtotalAfterDiscount + vat;

    const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

    return (
        <div className="p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto">
                <header className="flex justify-between items-center border-b pb-4 mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Invoice / Fees Receipt</h2>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Date: 01/12/2023</p>
                        <p className="font-semibold text-yellow-600">Status: Pending</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-8 mb-8 text-gray-700">
                    <div>
                        <h4 className="font-bold text-lg mb-2 text-indigo-700">Billed From: Ridbharat (School Admin)</h4>
                        <p>Ridbharat Education</p>
                        <p>#8801 Address Line, City</p>
                        <p>Email: info@ridbharat.com</p>
                        <p>Phone: +91 123 456 7890</p>
                    </div>
                    <div className="text-right">
                        <h4 className="font-bold text-lg mb-2 text-indigo-700">Billed To: Bob Mart (Student Name)</h4>
                        <p>Danial Marek</p>
                        <p>#8901 Address Line, City</p>
                        <p>Email: bob@example.com</p>
                        <p>Phone: +91 098 765 4321</p>
                    </div>
                </div>

                <div className="overflow-x-auto mb-8">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fees Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.feesType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.frequency}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">{item.invoiceNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <div className="w-full sm:w-80 space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-semibold">{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount (20%):</span>
                            <span className="font-semibold text-red-500">-{formatCurrency(discount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VAT (10%):</span>
                            <span className="font-semibold text-green-500">+{formatCurrency(vat)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t-2 border-indigo-200">
                            <span className="text-xl font-bold text-indigo-700">Total Due:</span>
                            <span className="text-xl font-bold text-indigo-700">{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center space-x-4">
                    <button className="flex items-center px-6 py-3 bg-indigo-500 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-600 transition">
                        <DollarSign className="w-5 h-5 mr-2" /> Proceed to Payment
                    </button>
                    <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition">
                        <FileText className="w-5 h-5 mr-2" /> Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};
const GenericManagementView: React.FC<{ section: string }> = ({ section }) => (
    <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">{section}</h2>
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-700 mb-4">
                This section, **{section}**, is a placeholder for your **Professor/Fees/Reports** management interface.
            </p>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="font-semibold text-yellow-800">
                    API Integration Ready:
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                    Here, you would implement the **CRUD logic** for {section.toLowerCase().replace(/ /g, '_')}.
                </p>
            </div>
        </div>
    </div>
);


// --- 4. MAIN APPLICATION LAYOUT & STATE MANAGEMENT ---

const menuStructure = [
  { title: 'Dashboard', section: 'dashboard', icon: Home, submenu: [] },
  { title: 'Professors', section: 'professors', icon: HardHat, submenu: ['All Professors', 'Add Professor', 'Edit Professor'] },
  { title: 'Students', section: 'students', icon: Users, submenu: ['All Students', 'Add Student', 'Edit Student'] },
  { title: 'Courses', section: 'courses', icon: BookOpen, submenu: ['All Courses', 'Add Course', 'Edit Course'] },
  { title: 'Fees', section: 'fees', icon: DollarSign, submenu: ['Fees Collection', 'Fees Receipt'] },
  { title: 'Assignments', section: 'assignments', icon: ListChecks, submenu: ['Add Assignment', 'Review Assignments'] },
  { title: 'Reports', section: 'reports', icon: BarChart, submenu: [] },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- MOCK CRUD STATE ---
  const [studentList, setStudentList] = useState(initialStudentList);
  const [assignmentList, setAssignmentList] = useState(initialAssignmentList);
  const courseList = initialCourseList; // Static for this demo

  // Student CRUD Handlers (Ready for API integration)
  const addStudent = useCallback((newStudent: Omit<Student, 'id' | 'status' | 'profileImage'>) => {
    // API READY: Replace with actual POST API call
    const id = studentList.length > 0 ? Math.max(...studentList.map(s => s.id)) + 1 : 1;
    // Mocking the status and a placeholder image for new students
    const student: Student = { ...newStudent, id, status: 'Pending' as 'Pending', profileImage: `https://placehold.co/150x150/000000/ffffff?text=NEW` };
    setStudentList(prev => [...prev, student]);
    console.log('API READY: Student added:', student);
  }, [studentList]);

  const deleteStudent = useCallback((id: number) => {
    // API READY: Replace with actual DELETE API call
    setStudentList(prev => prev.filter(s => s.id !== id));
    console.log('API READY: Student deleted:', id);
  }, []);

  const updateStudent = useCallback((updatedStudent: Student) => {
    // API READY: Replace with actual PUT/PATCH API call
    setStudentList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    console.log('API READY: Student updated:', updatedStudent);
  }, []);

  // Assignment CRUD Handlers (Ready for API integration)
  const addAssignment = useCallback((newAssignment: Omit<Assignment, 'id' | 'submissions'>) => {
    // API READY: Replace with actual POST API call
    const id = assignmentList.length > 0 ? Math.max(...assignmentList.map(a => a.id)) + 1 : 1;
    const assignment = { ...newAssignment, id, submissions: [] };
    setAssignmentList(prev => [...prev, assignment]);
    console.log('API READY: Assignment published:', assignment);
  }, [assignmentList]);

  const gradeSubmission = useCallback((assignmentId: number, studentId: number, grade: number | string, comments: string) => {
    // API READY: Replace with actual PATCH API call to update submission status
    setAssignmentList(prev => prev.map(assignment => {
        if (assignment.id === assignmentId) {
            return {
                ...assignment,
                submissions: assignment.submissions.map(sub => {
                    if (sub.studentId === studentId) {
                        return { ...sub, status: 'Graded', grade, comments };
                    }
                    return sub;
                })
            };
        }
        return assignment;
    }));
    console.log(`Grade ${grade} submitted for student ID ${studentId} on assignment ID ${assignmentId}.`);
  }, []);


  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview stats={dynamicStatsData} studentList={studentList} />;

      // Student Views (CRUD)
      case 'students/All Students':
        // Updated call: removed onUpdate prop as inline editing was removed to match screenshot design
        return <AllStudentsView students={studentList} onDelete={deleteStudent} />;
      case 'students/Add Student':
        // Updated prop type
        return <AddStudentForm onAdd={addStudent} />;
      case 'students/Edit Student':
          return <GenericManagementView section="Edit Student" />;

      // Course Views
      case 'courses/All Courses':
        return <AllCoursesView data={courseList} />;
      case 'courses/Add Course':
        return <AddCourseForm />;
      case 'courses/Edit Course':
          return <GenericManagementView section="Edit Course" />;

      // Assignment Views (CRUD)
      case 'assignments/Add Assignment':
          return <AddAssignmentForm courses={courseList} onAdd={addAssignment} />;
      case 'assignments/Review Assignments':
          return <ReviewAssignmentsView assignments={assignmentList} onGrade={gradeSubmission} />;

      // Fees Views - FEES COLLECTION IMPLEMENTED
      case 'fees/Fees Collection':
        return <FeesCollectionView data={initialFeesCollectionList} />;
      case 'fees/Fees Receipt':
        return <FeesReceiptView data={initialFeesReceipt} />;
      
      // Default/Placeholder Views
      case 'professors/All Professors':
      case 'professors/Add Professor':
      case 'professors/Edit Professor':
      case 'reports':
        return <GenericManagementView section={activeSection.split('/').pop() || activeSection} />;

      default:
        return <div>404: Page Not Found</div>;
    }
  };

  // Re-calculate stats data when studentList or assignmentList changes
  const dynamicStatsData = useMemo(() => {
    const newStats = statsData.map(stat => {
        if (stat.title === 'Total Students') {
            return { ...stat, value: studentList.length };
        }
        if (stat.title === 'Total Assignments') {
            return { ...stat, value: assignmentList.length };
        }
        return stat;
    });
    return newStats;
  }, [studentList, assignmentList]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition duration-300 ease-in-out w-64 bg-white shadow-xl z-20 flex flex-col rounded-tr-xl rounded-br-xl`}
      >
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-3xl font-extrabold text-indigo-700">RIDBHARAT</h1>
          <p className='text-xs text-gray-500'>Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuStructure.map(item => (
            <SidebarLink
              key={item.section}
              title={item.title}
              section={item.section}
              icon={item.icon}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              submenu={item.submenu}
            />
          ))}
        </nav>
        <div className='p-4 border-t border-gray-100 text-sm text-center text-gray-500'>
            © 2025 Ridbharat. All Rights Reserved.
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 lg:hidden hover:text-indigo-600 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 hidden sm:block">
            {activeSection.split('/').pop() || 'Dashboard'}
          </h2>

          <div className="flex items-center space-x-4">
            <input
              type="search"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 w-32 sm:w-64"
            />
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100"><Mail className="w-5 h-5" /></button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 transition rounded-full hover:bg-gray-100"><Bell className="w-5 h-5" /></button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img
                className="h-9 w-9 rounded-full object-cover border-2 border-indigo-400"
                src="https://placehold.co/150x150/4f46e5/ffffff?text=AD"
                alt="Admin Profile"
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

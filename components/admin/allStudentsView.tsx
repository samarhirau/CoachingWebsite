// import React, { useState } from 'react';
// import { PlusCircle, Edit, Trash2 } from 'lucide-react';



// interface Student {
//   id: number;
//   rollNo: string;
//   name: string;
//   education: string;
//   mobile: string;
//   email: string;
//   admissionDate: string;
//   status: 'Checkin' | 'Pending' | 'Canceled';
//   assignedProfessor: string;
//   subject: string;
//   fees: string;
// }


// const AllStudentsView: React.FC<{ students: Student[]; onDelete: (id: number) => void }> = ({ students, onDelete }) => {
//     // Note: Inline editing logic (isEditing, etc.) has been removed to match the screenshot's clean table look.
//     const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

//     const getStatusClass = (status: Student['status']) => {
//         switch (status) {
//             case 'Checkin': return 'bg-green-100 text-green-800 font-bold';
//             case 'Pending': return 'bg-yellow-100 text-yellow-800 font-bold';
//             case 'Canceled': return 'bg-red-100 text-red-800 font-bold';
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="bg-white rounded-xl shadow-lg p-6">
//                 <div className="flex justify-between items-center mb-6 border-b pb-4">
//                     {/* List/Grid View Tabs */}
//                     <div className="flex space-x-2 border border-gray-300 rounded-lg p-1">
//                         <button
//                             onClick={() => setViewMode('list')}
//                             className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
//                                 viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                             }`}
//                         >
//                             List View
//                         </button>
//                         <button
//                             onClick={() => setViewMode('grid')}
//                             className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
//                                 viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                             }`}
//                         >
//                             Grid View
//                         </button>
//                     </div>

//                     <h2 className="text-xl font-bold text-gray-800 hidden sm:block">All Students List</h2>
                    
//                     <button onClick={() => console.log('Navigate to Add Student')} className='px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center'>
//                         <PlusCircle className='w-4 h-4 mr-1' /> Add new
//                     </button>
//                 </div>

//                 {/* Search and Entries */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div className="text-sm text-gray-600">
//                         Show
//                         <select className="mx-2 p-1 border rounded-md bg-white">
//                             <option>10</option>
//                             <option>25</option>
//                             <option>50</option>
//                         </select>
//                         entries
//                     </div>
//                     <input
//                         type="search"
//                         placeholder="Search..."
//                         className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
//                     />
//                 </div>

//                 {/* Table Content */}
//                 {viewMode === 'list' && (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
//                                     {['Roll No.', 'Name', 'Education', 'Mobile', 'Email', 'Admission Date', 'Status', 'Actions'].map(header => (
//                                         <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {students.map(student => (
//                                     <tr key={student.id} className="hover:bg-gray-50">
                                        
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.rollNo}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.education}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.mobile}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.admissionDate}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(student.status)}`}>
//                                                 {student.status === 'Checkin' ? 'Check-in' : student.status}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                             <div className='flex space-x-2'>
//                                                 {/* Edit button is now a navigation placeholder */}
//                                                 <button title="Edit Student" className="text-indigo-600 hover:text-indigo-900 transition"><Edit className="w-4 h-4" /></button>
//                                                 <button title="Delete Student" onClick={() => onDelete(student.id)} className="text-red-600 hover:text-red-900 transition"><Trash2 className="w-4 h-4" /></button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//                 {viewMode === 'grid' && (
//                     <div className="p-10 text-center text-gray-500">
//                         <p className='text-lg font-semibold'>Grid View is a placeholder for a card layout of students.</p>
//                         <p className='text-sm mt-2'>Please select 'List View' to see the student data.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllStudentsView;

"use client";
import { useEffect, useState } from "react";
import { Trash2, Edit, Loader2 } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch(`/api/students?search=${search}&limit=${limit}&page=${page}`);
    const data = await res.json();
    setStudents(data.users);
    setTotal(data.total);
    setLoading(false);
  };

const shortId = (id: string) => id.slice(-8);


  useEffect(() => { fetchStudents(); }, [search, page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Students</h1>

        <input
          type="search"
          placeholder="Search..."
          className="px-3 py-2 border rounded-lg"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16 text-gray-500">
            <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading...
          </div>
        ) : students.length === 0 ? (
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
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {students.map((student: any) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">up{shortId(student._id)}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.phone || "-"}</td>
                    <td className="px-6 py-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                     
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center py-6 text-sm">

        <div>
          Show
          <select className="border ml-2 px-1 rounded" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          entries
        </div>

        {totalPages > 1 && (
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded bg-gray-100">{page}/{totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

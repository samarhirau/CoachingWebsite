"use client";
import React from "react";
import { Mail as MailIcon, GraduationCap, Edit, Trash2 } from "lucide-react";
import { StatCard } from "@/components/admin/statCard";

interface Student {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

interface DashboardStats {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  prefix?: string;
}

interface DashboardOverviewProps {
  stats: DashboardStats[];
  studentList: Student[];
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ stats, studentList }) => {
  function shortId(_id: any) {
    return _id.toString().slice(-5);
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Quick Mail + Toppers Section */}
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
            {['Ramesh Kumar (501)', 'Priya Sharma (502)', 'Amit Singh (503)', 'Sneha Varma (504)'].map((topper, i) => (
              <li key={i} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                <span className="text-gray-700">{topper}</span>
                <button className="text-sm text-indigo-500 hover:text-indigo-700 transition duration-150">Edit Score</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white shadow-sm rounded-xl overflow-hidden mt-6">
        {studentList.length === 0 ? (
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
                {studentList.slice(0, 8).map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">up{shortId(student._id)}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4">{student.email}</td>
                    <td className="px-6 py-4">{student.phone || "-"}</td>
                    <td className="px-6 py-4">{new Date(student.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button title="Edit" className="text-blue-500 hover:text-blue-700"><Edit className="w-4 h-4" /></button>
                      <button title="Delete" className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

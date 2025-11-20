






"use client";
import { use, useEffect, useState } from "react";
import { Trash2, Edit, Loader2 } from "lucide-react";

export default function StudentsPage() {
  // Initialize total to 0 to prevent issues with Math.ceil(undefined / limit)
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0); // <-- Safe initialization
  const [loading, setLoading] = useState(true);




const fetchStudents = async () => {
  setLoading(true);
  try {
    const res = await fetch(`/api/students?search=${search}&limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error(`API failed with status ${res.status}`);
    const data = await res.json();
    console.log("API response:", data);

    // data is already an array
    setStudents(data || []);
    setTotal(data.length || 0);
  } catch (err) {
    console.error("Failed to fetch students:", err);
    setStudents([]);
    setTotal(0);
  }
  setLoading(false);
};



  const shortId = (id: string) => id.slice(-8);

  // Re-fetch data whenever search, page, or limit changes
  useEffect(() => { 
    fetchStudents(); 
  }, [search, page, limit]);

  // Polling mechanism every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStudents();
    }, 5000);
    return () => clearInterval(interval);
  }, [search, page, limit]);

  // totalPages calculation now safe because total is initialized to 0
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
                  <th className="px-6 py-3 text-left">Actions</th>
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

        {/* FIX: Ensure total > 0 before checking totalPages to prevent rendering issues */}
        {total > 0 && totalPages > 1 && (
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








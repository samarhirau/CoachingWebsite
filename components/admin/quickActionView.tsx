import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface QuickActionItem {
     _id: string;   
     name: string;
     userId: {
           name: string;
               email: string;
     } | null;
     createdAt: string;
}




const QuickActionListView: React.FC = () => {
  const [actions, setActions] = useState<QuickActionItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const fetchActions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/quick-action/list?page=${page}&limit=${perPage}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setActions(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      toast.error("Failed to load actions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
  }, [page]);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selected);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelected(newSet);
  };

  const processActions = async () => {
    if (selected.size === 0) return toast.error("Select at least one");

    try {
      setProcessing(true);
      const res = await fetch("/api/quick-action/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success(data.message);
      setSelected(new Set());
      fetchActions();
    } catch (err) {
      toast.error("Processing failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p className="p-6">Loading actions...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Quick Actions</h2>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Created At</th>
            </tr>
          </thead>

          <tbody>
            {actions.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(item._id)}
                    onChange={() => toggleSelect(item._id)}
                  />
                </td>
                <td className="p-3">
                  <div>{item.userId?.name ?? "Unknown"}</div>
                  <div className="text-sm text-gray-500">
                    {item.userId?.email ?? "-"}
                  </div>
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {actions.length === 0 && (
          <p className="mt-4 text-gray-500">No pending requests</p>
        )}

        <div className="flex justify-between items-center mt-4">
          <div>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="ml-2 px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>

          <button
            onClick={processActions}
            disabled={processing || selected.size === 0}
            className={`px-6 py-2 rounded text-white ${
              processing ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {processing ? "Processing..." : `Process (${selected.size})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionListView;
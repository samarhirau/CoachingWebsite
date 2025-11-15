import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface NewsletterItem {
  _id: string;
  email: string;
  createdAt: string;
}

const NewsletterListView: React.FC = () => {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/newslatter/list?page=${page}&limit=${perPage}`);
      const data = await res.json();
      if (res.ok) {
        setNewsletters(data.data);
      } else {
        setError(data.message || "Failed to fetch newsletters");
        toast.error(data.message || "Failed to fetch newsletters");
      }
    } catch {
      setError("Something went wrong while fetching newsletters.");
      toast.error("Something went wrong while fetching newsletters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, [page]);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  };

const sendEmails = async () => {
  if (selected.size === 0) return alert("Please select at least one subscriber.");

  try {
    setSending(true);
    setError(null);
    setSuccessMessage(null);

    const res = await fetch("/api/newslatter/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected) }), 
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMessage(data.message || "Emails sent successfully!");
      setSelected(new Set()); // clear selection
      toast.success("Emails sent successfully!");
    } else {
      setError(data.message || "Failed to send emails.");
      toast.error("Failed to send emails.");
    }
  } catch {
    setError("Something went wrong while sending emails.");
    toast.error("Something went wrong while sending emails.");
  } finally {
    setSending(false);
  }
};


  if (loading) return <p className="p-6 text-gray-700">Loading newsletters...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Newsletter Subscribers</h2>

      {successMessage && (
        <p className="mb-4 p-3 bg-green-100 text-green-800 rounded">{successMessage}</p>
      )}

      {error && (
        <p className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</p>
      )}

      <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribed At
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {newsletters.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selected.has(item._id)}
                    onChange={() => toggleSelect(item._id)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {newsletters.length === 0 && (
          <p className="mt-4 text-gray-500">No subscribers found.</p>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 mr-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={page === 1 || sending}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={sending}
            >
              Next
            </button>
          </div>
          <button
            onClick={sendEmails}
            className={`px-6 py-2 rounded text-white ${
              sending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={sending || selected.size === 0}
          >
            {sending ? "Sending..." : `Send Email (${selected.size})`}
          </button>
        </div>
      </div>
    </div>
  );
};


export default NewsletterListView;
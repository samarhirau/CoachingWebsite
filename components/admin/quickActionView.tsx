"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

interface QuickActionItem {
  _id: string;
  name: string;
  userId: { name: string; email: string } | null;
  createdAt: string;
  status?: "pending" | "processed";
}

const QuickActionListView: React.FC = () => {
  const [actions, setActions] = useState<QuickActionItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  const pathname = usePathname();
  const fetchSignalRef = useRef<AbortController | null>(null);

  const fetchActions = useCallback(async (opts?: { silent?: boolean }) => {
    try {
      if (!opts?.silent) setLoading(true);
      // cancel any previous request
      fetchSignalRef.current?.abort();
      const ctrl = new AbortController();
      fetchSignalRef.current = ctrl;

      const res = await fetch(`/api/quick-action/list?page=${page}&limit=${perPage}`, {
        signal: ctrl.signal,
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Failed to load");

      // use status from DB (don't overwrite)
      setActions(Array.isArray(data.data) ? data.data : []);
      setTotalPages(data.pagination?.totalPages ?? 1);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      toast.error("Failed to load actions");
    } finally {
      if (!fetchSignalRef.current?.signal.aborted) setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchActions();
    return () => {
      // cleanup abort when unmounting
      fetchSignalRef.current?.abort();
    };
  }, [fetchActions, pathname]); // pathname ensures route changes re-fetch

  // Re-fetch when tab/window gets focus (helps when layout keeps component mounted)
  useEffect(() => {
    const onFocus = () => fetchActions({ silent: true });
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchActions({ silent: true });
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fetchActions]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
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
      if (!res.ok) throw new Error(data.message || "Processing failed");

      toast.success(data.message || "Processed");

      // update local state: prefer marking processed (so UI shows it immediately)
      setActions((prev) =>
        prev.map((it) => (selected.has(it._id) ? { ...it, status: "processed" } : it))
      );
      setSelected(new Set());
    } catch (err) {
      toast.error("Processing failed");
    } finally {
      setProcessing(false);
    }
  };

  const onRefreshClick = () => {
    // explicit refresh (re-fetch from server)
    fetchActions();
  };

  if (loading) return <p className="p-6">Loading actions...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Quick Actions</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshClick}
            className="px-4 py-2 bg-gray-200 rounded"
            aria-label="Refresh actions"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Status</th>
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
                    disabled={item.status === "processed"}
                  />
                </td>
                <td className="p-3">
                  <div>{item.userId?.name ?? "Unknown"}</div>
                  <div className="text-sm text-gray-500">{item.userId?.email ?? "-"}</div>
                </td>
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  {item.status === "processed" ? (
                    <span className="text-green-600 font-semibold">Processed</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {actions.length === 0 && <p className="mt-4 text-gray-500">No actions found</p>}

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

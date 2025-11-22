"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export default function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchContacts = async () => {
    try {
      const res = await fetch(
        `/api/contact/list?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`
      );
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
        setTotal(data.total);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search, page]);

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this contact?")) return;

  try {
    const res = await fetch(`/api/contact/delete/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      toast.success("Contact deleted");
      // Remove the deleted contact from state immediately
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      setTotal((prev) => prev - 1); // Update total count
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete contact");
  }
};


  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="mb-4 p-2 border rounded w-full max-w-sm"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Inquiry Type</th>
              <th className="px-4 py-2 border">Message</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{c.name}</td>
                <td className="px-4 py-2 border">{c.email}</td>
                <td className="px-4 py-2 border">{c.phone}</td>
                <td className="px-4 py-2 border">{c.course}</td>
                <td className="px-4 py-2 border">{c.inquiryType}</td>
                <td className="px-4 py-2 border">{c.message}</td>
                <td className="px-4 py-2 border">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1 border rounded">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function AddStudentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setResponse(data.message || data.error);
    setLoading(false);

    if (res.ok) {
      setForm({ name: "", email: "", phone: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          required
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="w-full border p-3 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Add Student"}
        </button>
      </form>

      {response && (
        <p className="mt-4 text-center text-sm font-medium">
          {response}
        </p>
      )}
    </div>
  );
}

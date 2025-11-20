"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { FileSignature } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Student {
  _id: string;
  name: string;
}

interface Course {
  _id: string;
  name: string;
}

interface AssignmentFormProps {
  onAdd?: () => void; // callback to revalidate assignment list
}

const AddAssignmentForm: React.FC<AssignmentFormProps> = ({ onAdd }) => {
  const { data: courses } = useSWR<Course[]>("/api/courses", fetcher);
  const { data: students } = useSWR<Student[]>("/api/students?role=student", fetcher);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().slice(0, 10),
    course: "",
  });

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentToggle = (id: string) => {
    setSelectedStudents(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course) return;

    setLoading(true);

    const submissions = selectedStudents.map(id => ({
      student: id,
      file: "",
      marks: null,
      feedback: "",
    }));

    try {
      const res = await fetch("/api/assignments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, submissions }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add assignment");

      setFormData({ title: "", description: "", dueDate: new Date().toISOString().slice(0, 10), course: "" });
      setSelectedStudents([]);

      // Revalidate assignment list if parent component uses SWR
      onAdd?.();

      alert("Assignment created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6">Publish New Assignment</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Assignment Title"
        className="w-full p-3 border rounded-lg"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Assignment Instructions"
        rows={4}
        className="w-full p-3 border rounded-lg"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg"
        >
          <option value="">Select Course</option>
          {courses?.map(c => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border p-4 rounded-lg max-h-48 overflow-y-auto">
        <p className="font-semibold mb-2">Assign to Students:</p>
        <div className="flex flex-wrap gap-2">
          {students?.map(student => (
            <label
              key={student._id}
              className={`px-3 py-1 border rounded-lg cursor-pointer ${
                selectedStudents.includes(student._id) ? "bg-indigo-500 text-white" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentToggle(student._id)}
              />
              {student.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-500 text-white font-bold rounded-lg flex justify-center items-center gap-2 hover:bg-indigo-600 transition"
      >
        <FileSignature className="w-5 h-5" /> {loading ? "Publishing..." : "Publish Assignment"}
      </button>
    </form>
  );
};

export default AddAssignmentForm;

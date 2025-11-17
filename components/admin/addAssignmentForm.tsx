import React, { useState } from 'react';
import { FileSignature } from 'lucide-react';






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


interface Course {
  id: number;
  name: string;
  code: string;
  duration: string;
  professor: string;
  studentsCount: number;
  image: string;
}

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



export default AddAssignmentForm;
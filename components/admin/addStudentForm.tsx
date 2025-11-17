import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';


interface Student {
  id: number;
  rollNo: string;
  name: string;
  education: string;
  mobile: string;
  email: string;
  admissionDate: string;
  status: 'Checkin' | 'Pending' | 'Canceled';
  assignedProfessor: string;
  subject: string;
  fees: string;
}





const AddStudentForm: React.FC<{ onAdd: (student: Omit<Student, 'id' | 'status' | 'profileImage'>) => void }> = ({ onAdd }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id' | 'status' | 'profileImage'>>({
        rollNo: '', name: '', education: '', mobile: '', email: '', admissionDate: new Date().toISOString().slice(0, 10), assignedProfessor: '', subject: '', fees: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // API READY: Simulate POST request to /api/students/add
        onAdd(formData);
        // Reset form
        setFormData({ rollNo: '', name: '', education: '', mobile: '', email: '', admissionDate: new Date().toISOString().slice(0, 10), assignedProfessor: '', subject: '', fees: '' });
        // NOTE: Replacing alert with console log to follow modern web practice
        console.log('New student added successfully!');
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Student</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Student Enrollment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="Roll No" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} placeholder="Admission Date" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Contact & Background</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Previous Education" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Current Subject/Stream" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <h3 className="text-xl font-semibold mb-6 border-b pb-2 text-indigo-700">Faculty & Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input type="text" name="assignedProfessor" value={formData.assignedProfessor} onChange={handleChange} placeholder="Assigned Professor" className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="text" name="fees" value={formData.fees} onChange={handleChange} placeholder="Total Fees ($)" required className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-150 mt-4">
                    <PlusCircle className="w-5 h-5 inline mr-2" /> Enroll Student
                </button>
            </form>
        </div>
    );
};




export default AddStudentForm;
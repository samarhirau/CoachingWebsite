import React, { useState } from 'react';
import { CornerDownRight, ClipboardCheck, X } from 'lucide-react';

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











const ReviewAssignmentsView: React.FC<{ assignments: Assignment[]; onGrade: (assignmentId: number, studentId: number, grade: number | string, comments: string) => void }> = ({ assignments, onGrade }) => {
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | 'all'>('all');
    const [gradingSubmission, setGradingSubmission] = useState<{ assignmentId: number; studentId: number } | null>(null);
    const [gradeData, setGradeData] = useState({ grade: '', comments: '' });

    const filteredAssignments = selectedAssignmentId === 'all'
        ? assignments
        : assignments.filter(a => a.id === selectedAssignmentId);

    const submissionsToReview = filteredAssignments.flatMap(a =>
        a.submissions.filter(s => s.status === 'Submitted').map(s => ({
            ...s,
            assignmentId: a.id,
            assignmentTitle: a.title,
            course: a.course
        }))
    );

    const handleGradeClick = (assignmentId: number, studentId: number) => {
        setGradingSubmission({ assignmentId, studentId });
        setGradeData({ grade: '', comments: '' });
    };

    const handleGradeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (gradingSubmission) {
            // API READY: Simulate PATCH request to update submission grade
            onGrade(
                gradingSubmission.assignmentId,
                gradingSubmission.studentId,
                gradeData.grade,
                gradeData.comments
            );
            setGradingSubmission(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Review Student Submissions</h2>

            <div className="flex justify-between items-center mb-6">
                <select
                    value={selectedAssignmentId}
                    onChange={(e) => setSelectedAssignmentId(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                    <option value="all">View All Assignments</option>
                    {assignments.map(a => <option key={a.id} value={a.id}>{a.title} ({a.course})</option>)}
                </select>
                <div className="text-gray-600 font-semibold">
                    <span className="text-indigo-600">{submissionsToReview.length}</span> Submissions Awaiting Review
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Assignment', 'Course', 'Student Name', 'Submitted On', 'File', 'Actions'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {submissionsToReview.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No submissions to review for the selected assignment.</td></tr>
                        ) : (
                            submissionsToReview.map(sub => (
                                <React.Fragment key={`${sub.assignmentId}-${sub.studentId}`}>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{sub.assignmentTitle}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{sub.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.studentName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.submittedDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 font-medium flex items-center">
                                                <CornerDownRight className='w-4 h-4 mr-1' /> View File
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleGradeClick(sub.assignmentId, sub.studentId)}
                                                className="flex items-center px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600 transition"
                                            >
                                                <ClipboardCheck className="w-4 h-4 mr-1" /> Grade
                                            </button>
                                        </td>
                                    </tr>
                                    {gradingSubmission?.assignmentId === sub.assignmentId && gradingSubmission.studentId === sub.studentId && (
                                        <tr>
                                            <td colSpan={6} className="bg-green-50 p-4 border-t-2 border-green-200">
                                                <form onSubmit={handleGradeSubmit} className="flex space-x-4 items-center">
                                                    <label className="flex items-center space-x-2 text-sm font-semibold text-green-800">
                                                        Grade (e.g., 95/100):
                                                        <input
                                                            type="text"
                                                            name="grade"
                                                            value={gradeData.grade}
                                                            onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                                                            required
                                                            className="p-1 border border-green-300 rounded-md w-32 focus:ring-green-500"
                                                        />
                                                    </label>
                                                    <label className="flex items-center space-x-2 text-sm font-semibold text-green-800 flex-grow">
                                                        Comments:
                                                        <input
                                                            type="text"
                                                            name="comments"
                                                            value={gradeData.comments}
                                                            onChange={(e) => setGradeData({ ...gradeData, comments: e.target.value })}
                                                            className="p-1 border border-green-300 rounded-md w-full focus:ring-green-500"
                                                        />
                                                    </label>
                                                    <button type="submit" className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-sm">
                                                        Submit Grade
                                                    </button>
                                                    <button type="button" onClick={() => setGradingSubmission(null)} className="text-red-600 hover:text-red-800">
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ReviewAssignmentsView;
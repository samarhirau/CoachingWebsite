"use client";

import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { CornerDownRight, ClipboardCheck, X } from "lucide-react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Submission {
  student: { _id: string; name: string };
  file: string;
  submittedAt: string;
  marks?: number | string;
  feedback?: string;
  status: "Submitted" | "Graded" | "Missing";
}

interface Assignment {
  _id: string;
  title: string;
  course: { _id: string; name: string };
  dueDate: string;
  description: string;
  submissions: Submission[];
}

const ReviewAssignmentsView: React.FC = () => {
  const { data: assignments } = useSWR<Assignment[]>("/api/assignments", fetcher);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | "all">("all");
  const [gradingSubmission, setGradingSubmission] = useState<{ assignmentId: string; studentId: string } | null>(null);
  const [gradeData, setGradeData] = useState({ grade: "", comments: "" });

  const filteredAssignments = selectedAssignmentId === "all"
    ? assignments || []
    : (assignments || []).filter(a => a._id === selectedAssignmentId);

  const submissionsToReview = filteredAssignments.flatMap(a =>
    a.submissions
      .filter(s => s.status === "Submitted")
      .map(s => ({
        ...s,
        assignmentId: a._id,
        assignmentTitle: a.title,
        courseName: a.course.name,
        studentName: s.student.name,
      }))
  );

  const handleGradeClick = (assignmentId: string, studentId: string) => {
    setGradingSubmission({ assignmentId, studentId });
    setGradeData({ grade: "", comments: "" });
  };

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    try {
      const res = await fetch(`/api/assignments/${gradingSubmission.assignmentId}/grade`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: gradingSubmission.studentId, grade: gradeData.grade, comments: gradeData.comments }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update grade");

      setGradingSubmission(null);
      mutate("/api/assignments"); // revalidate assignments
      alert("Grade submitted successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Review Student Submissions</h2>

      <div className="flex justify-between items-center mb-6">
        <select
          value={selectedAssignmentId}
          onChange={e => setSelectedAssignmentId(e.target.value === "all" ? "all" : e.target.value)}
          className="p-3 border border-gray-300 rounded-lg bg-white"
        >
          <option value="all">View All Assignments</option>
          {assignments?.map(a => (
            <option key={a._id} value={a._id}>
              {a.title} ({a.course.name})
            </option>
          ))}
        </select>
        <div className="text-gray-600 font-semibold">
          <span className="text-indigo-600">{submissionsToReview.length}</span> Submissions Awaiting Review
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Assignment", "Course", "Student Name", "Submitted On", "File", "Actions"].map(header => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissionsToReview.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No submissions to review.
                </td>
              </tr>
            ) : (
              submissionsToReview.map(sub => (
                <React.Fragment key={`${sub.assignmentId}-${sub.student._id}`}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-indigo-600">{sub.assignmentTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sub.courseName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{sub.studentName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{sub.submittedAt}</td>
                    <td className="px-6 py-4 text-sm">
                      <a href={sub.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center">
                        <CornerDownRight className="w-4 h-4 mr-1" /> View File
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleGradeClick(sub.assignmentId, sub.student._id)}
                        className="flex items-center px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full hover:bg-green-600"
                      >
                        <ClipboardCheck className="w-4 h-4 mr-1" /> Grade
                      </button>
                    </td>
                  </tr>

                  {gradingSubmission?.assignmentId === sub.assignmentId && gradingSubmission.studentId === sub.student._id && (
                    <tr>
                      <td colSpan={6} className="bg-green-50 p-4 border-t-2 border-green-200">
                        <form onSubmit={handleGradeSubmit} className="flex space-x-4 items-center">
                          <input
                            type="text"
                            placeholder="Grade"
                            value={gradeData.grade}
                            onChange={e => setGradeData({ ...gradeData, grade: e.target.value })}
                            required
                            className="p-1 border border-green-300 rounded-md w-32"
                          />
                          <input
                            type="text"
                            placeholder="Comments"
                            value={gradeData.comments}
                            onChange={e => setGradeData({ ...gradeData, comments: e.target.value })}
                            className="p-1 border border-green-300 rounded-md flex-grow"
                          />
                          <button type="submit" className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Submit
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

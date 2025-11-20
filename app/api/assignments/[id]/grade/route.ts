import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Assignment from "@/models/Assignment";
import mongoose from "mongoose";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const assignmentId = params.id;

  try {
    const { studentId, grade, comments } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(assignmentId) || !mongoose.Types.ObjectId.isValid(studentId)) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return NextResponse.json({ error: "Assignment not found" }, { status: 404 });

    const submission = assignment.submissions.find(s => s.student.toString() === studentId);
    if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

    submission.marks = grade;
    submission.feedback = comments;
    submission.status = "Graded";

    await assignment.save();

    return NextResponse.json({ message: "Grade updated", submission });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update grade" }, { status: 500 });
  }
}

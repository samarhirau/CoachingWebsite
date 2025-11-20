import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Assignment from "@/models/Assignment";

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.json();

    if (!data.title || !data.course) {
      return NextResponse.json({ error: "Title and course are required" }, { status: 400 });
    }

    // submissions array should be [{ student: studentId, file: '', marks: null, feedback: '' }, ...]
    const newAssignment = await Assignment.create({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      course: data.course, // must be ObjectId of the course
      submissions: data.submissions || [],
    });

    return NextResponse.json(newAssignment);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
  }
}

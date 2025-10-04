import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { studentId, courseId } = body;

    if (!studentId || !courseId) {
      return NextResponse.json({ error: "Missing studentId or courseId" }, { status: 400 });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      status: "pending",
    });

    return NextResponse.json({ enrollment }, { status: 201 });

  } catch (error: any) {
    console.error("Enrollment API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

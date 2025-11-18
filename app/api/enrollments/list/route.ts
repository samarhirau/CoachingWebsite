import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "studentId missing" },
        { status: 400 }
      );
    }

    console.log("Received studentId:", studentId);

    const enrollments = await Enrollment.find({
      studentId: studentId, // make sure field name is correct
    })
      .populate("courseId")
      .lean();

    console.log("Enrollments from DB:", enrollments);

    return NextResponse.json({
      success: true,
      courses: enrollments.map((e) => ({
        ...e.courseId,
        status: "enrolled",
      })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}

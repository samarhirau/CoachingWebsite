
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";
import "@/models/Course";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ success: false, message: "studentId missing" }, { status: 400 });
    }

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId")
      .lean();

    const paidEnrollments = [];

    for (const enrollment of enrollments) {
      const payment = await Payment.findOne({
        enrollment: enrollment._id,
        status: "success", // ✅ match webhook
      });

      if (payment && enrollment.courseId) {
        paidEnrollments.push({
          ...enrollment.courseId,
          enrollmentId: enrollment._id,
          status: "success",
          amount: enrollment.amount,
        });
      }
    }

    return NextResponse.json({
      success: true,
      courses: paidEnrollments,
    });
  } catch (error: any) {
    console.error("SERVER ERROR", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

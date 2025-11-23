import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: Request) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Missing orderId" },
        { status: 400 }
      );
    }

    // Find enrollment by orderId
    const enrollment = await Enrollment.findById(orderId).populate("courseId").lean();

    if (!enrollment) {
      return NextResponse.json(
        { success: false, message: "Enrollment not found" },
        { status: 404 }
      );
    }

    // Return payment info
    return NextResponse.json({
      success: true,
      payment: {
        enrollmentId: enrollment._id,
        orderId: enrollment._id, // using enrollment _id as orderId
        paymentId: enrollment.paymentId || null,
        orderAmount: enrollment.amount,
        orderStatus: enrollment.paymentStatus,
        courseName: enrollment.courseId?.title || "Course",
        studentName: enrollment.formData?.firstName + " " + enrollment.formData?.lastName,
        studentEmail: enrollment.formData?.email,
      },
    });
  } catch (err: any) {
    console.error("/api/razorpay/check-status error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server Error" },
      { status: 500 }
    );
  }
}

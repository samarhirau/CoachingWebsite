// app/api/razorpay/check-status/route.ts
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function GET(req: { url: string | URL }) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId missing" }, { status: 400 });
    }

    // 1️⃣ Find payment record
    const payment = await Payment.findOne({ orderId }).populate({
      path: "enrollment",
      populate: { path: "courseId" }
    });

    if (!payment) {
      return NextResponse.json({ success: false, message: "Payment not found" });
    }

    const enrollment = payment.enrollment;

    // 2️⃣ Optional: Fetch live status from Razorpay
    let liveStatus = enrollment.paymentStatus;
    try {
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const razorpayOrder = await razorpay.orders.fetch(orderId);
      if (razorpayOrder.status === "paid") liveStatus = "paid";
      else if (razorpayOrder.status === "created") liveStatus = "pending";
      else liveStatus = "failed";

      // Update DB if changed
      if (enrollment.paymentStatus !== liveStatus) {
        enrollment.paymentStatus = liveStatus;
        await enrollment.save();

        payment.status = liveStatus;
        payment.transactionId = razorpayOrder?.payments?.[0]?.id || payment.transactionId;
        payment.paidAt = liveStatus === "paid" ? new Date() : payment.paidAt;
        await payment.save();
      }
    } catch (err) {
      console.warn("Razorpay API fetch failed, using DB status only");
    }

    return NextResponse.json({
      success: true,
      payment: {
        orderId,
        paymentId: payment.transactionId || null,
        orderStatus: enrollment.paymentStatus,
        orderAmount: enrollment.amount,
        studentName: enrollment.formData?.firstName + " " + enrollment.formData?.lastName,
        studentEmail: enrollment.formData?.email,
        courseName: enrollment.courseId?.title || "Course",
      },
    });
  } catch (err: any) {
    console.error("Check status error:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: err.response?.data || err.message });
  }
}

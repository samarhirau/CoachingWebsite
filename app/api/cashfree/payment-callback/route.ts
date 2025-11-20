



// app/api/cashfree/payment-callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();
    console.log("Webhook payload:", data);

    const orderId = data.data.order.order_id;
    const paymentStatus = data.data.payment.payment_status;
    const transactionId = data.data.payment.cf_payment_id;
    const paymentTime = data.data.payment.payment_time;

    // 1️⃣ Find enrollment by order_id (which is enrollment._id)
    const enrollment = await Enrollment.findById(orderId);
    if (!enrollment) return NextResponse.json({ success: false, message: "Enrollment not found" }, { status: 404 });

    // 2️⃣ Update enrollment
    enrollment.paymentStatus = paymentStatus === "SUCCESS" ? "paid" : "failed";
    enrollment.paymentId = transactionId;
    await enrollment.save();

    // 3️⃣ Update payment
    const payment = await Payment.findOne({ enrollment: enrollment._id });
    if (payment) {
      payment.status = paymentStatus === "SUCCESS" ? "success" : "failed";
      payment.transactionId = transactionId;
      payment.paidAt = paymentStatus === "SUCCESS" ? new Date(paymentTime) : null;
      await payment.save();
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook Error:", err.message || err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

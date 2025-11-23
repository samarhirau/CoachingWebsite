
import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectDB();

  // 1️⃣ Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  // 2️⃣ Verify webhook signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (generated_signature !== signature) {
    return NextResponse.json(
      { success: false, message: "Invalid signature" },
      { status: 400 }
    );
  }

  // 3️⃣ Parse webhook payload
  const event = JSON.parse(rawBody);

  try {
    // 4️⃣ Handle payment events
    if (event.event === "payment.captured") {
      const { order_id, id: paymentId } = event.payload.payment.entity;

      const payment = await Payment.findOne({ orderId: order_id });
      if (payment) {
        payment.status = "paid";
        payment.transactionId = paymentId;
        payment.paidAt = new Date();
        await payment.save();

        await Enrollment.findByIdAndUpdate(payment.enrollment, { paymentStatus: "paid" });
      }
    } else if (event.event === "payment.failed") {
      const { order_id, id: paymentId } = event.payload.payment.entity;

      const payment = await Payment.findOne({ orderId: order_id });
      if (payment) {
        payment.status = "failed";
        payment.transactionId = paymentId;
        await payment.save();

        await Enrollment.findByIdAndUpdate(payment.enrollment, { paymentStatus: "failed" });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Webhook handling error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

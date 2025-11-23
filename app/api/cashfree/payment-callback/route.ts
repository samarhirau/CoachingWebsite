import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Payment from "@/models/Payment";
import Enrollment from "@/models/Enrollment";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const rawBody = await req.text();
    const timestamp = req.headers.get("x-webhook-timestamp") || "";
    const signature = req.headers.get("x-webhook-signature") || "";

    const expectedSignature = crypto.createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!).update(timestamp + rawBody).digest("base64");
    if (expectedSignature !== signature) return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });

    const payload = JSON.parse(rawBody);
    const orderId = payload?.data?.order?.order_id;
    const paymentStatus = payload?.data?.payment?.payment_status;
    const transactionId = payload?.data?.payment?.cf_payment_id;
    const paymentTime = payload?.data?.payment?.payment_time;

    if (!orderId || !paymentStatus) return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });

    const payment = await Payment.findOne({ orderId });
    if (!payment || payment.status !== "pending") return NextResponse.json({ success: true, message: "Already processed" });

    payment.status = paymentStatus === "SUCCESS" ? "success" : "failed";
    payment.transactionId = transactionId;
    payment.paidAt = paymentStatus === "SUCCESS" ? new Date(paymentTime) : null;
    await payment.save();

    const enrollment = await Enrollment.findById(payment.enrollment);
    if (enrollment) {
      enrollment.paymentStatus = paymentStatus === "SUCCESS" ? "paid" : "failed";
      enrollment.paymentId = transactionId;
      await enrollment.save();
    }

    return NextResponse.json({ success: true, message: "Webhook processed" });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

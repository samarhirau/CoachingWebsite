
// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";




// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";

// export async function POST(req: NextRequest) {
//   await connectDB();

//   try {
//     const payload = await req.json();
//     console.log("Webhook payload:", payload);

//     const orderId = payload.data.order.order_id;
//     const paymentStatus = payload.data.payment.payment_status;
//     const transactionId = payload.data.payment.cf_payment_id;
//     const paymentTime = payload.data.payment.payment_time;

//     // Find payment by orderId
//     const payment = await Payment.findOne({ orderId });
//     if (!payment) {
//       console.error("Payment not found for order:", orderId);
//       return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });
//     }

//     // Update payment
//     payment.status = paymentStatus === "SUCCESS" ? "success" : "failed";
//     payment.transactionId = transactionId;
//     payment.paidAt = paymentStatus === "SUCCESS" ? new Date(paymentTime) : null;
//     await payment.save();

//     // Update enrollment
//     const enrollment = await Enrollment.findById(payment.enrollment);
//     if (enrollment) {
//       enrollment.paymentStatus = paymentStatus === "SUCCESS" ? "paid" : "failed";
//       enrollment.paymentId = transactionId;
//       await enrollment.save();
//     }

//     return NextResponse.json({ success: true });

//   } catch (err: any) {
//     console.error("Webhook Error:", err.message || err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }








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

    const expectedSignature = crypto.createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!)
      .update(timestamp + rawBody).digest("base64");

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    console.log("Webhook verified:", payload);

    const orderId = payload?.data?.order?.order_id;
    const paymentStatus = payload?.data?.payment?.payment_status;
    const transactionId = payload?.data?.payment?.cf_payment_id;
    const paymentTime = payload?.data?.payment?.payment_time;

    if (!orderId || !paymentStatus) return NextResponse.json({ success: false, message: "Missing order_id or payment_status" }, { status: 400 });

    const payment = await Payment.findOne({ orderId });
    if (!payment || payment.status !== "pending") return NextResponse.json({ success: true, message: "Payment already processed" });

    const isSuccess = paymentStatus === "SUCCESS";
    payment.status = isSuccess ? "success" : "failed";
    payment.transactionId = transactionId;
    payment.paidAt = isSuccess ? new Date(paymentTime) : null;
    await payment.save();

    const enrollment = await Enrollment.findById(payment.enrollment);
    if (enrollment) {
      enrollment.paymentStatus = isSuccess ? "paid" : "failed";
      enrollment.paymentId = transactionId;
      await enrollment.save();
    }

    return NextResponse.json({ success: true, message: "Webhook processed successfully" });

  } catch (err: any) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}


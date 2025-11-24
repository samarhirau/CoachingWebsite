





// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";

// export const dynamic = "force-dynamic";

// export async function POST(req: Request) {
//   await connectDB();

//   const rawBody = await req.text();
//   const signature = req.headers.get("x-razorpay-signature") || "";

//   // Verify webhook signature using live webhook secret
//   const generated_signature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
//     .update(rawBody)
//     .digest("hex");

//   if (generated_signature !== signature) {
//     // Log the invalid signature attempt for security review
//     console.error("Invalid Razorpay Webhook Signature Received!");
//     return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
//   }

//   const event = JSON.parse(rawBody);

//   try {
//     if (event.event === "payment.captured") {
//       const { order_id, id: paymentId } = event.payload.payment.entity;

//       const payment = await Payment.findOne({ orderId: order_id });
//       if (payment) {
//         payment.status = "paid";
//         payment.transactionId = paymentId;
//         payment.paidAt = new Date();
//         // Clear any previous error/failure details
//         payment.failureReason = undefined; 
//         payment.failureDescription = undefined;
//         await payment.save();

//         await Enrollment.findByIdAndUpdate(payment.enrollment, { paymentStatus: "paid" });
//       }
//     } else if (event.event === "payment.failed") {
//       const { order_id, id: paymentId, error_code, error_description } = event.payload.payment.entity;
      
//       const payment = await Payment.findOne({ orderId: order_id });
//       if (payment) {
//         payment.status = "failed";
//         payment.transactionId = paymentId;
        
//         // --- LOGGING THE FAILURE REASON FOR DIAGNOSIS ---
//         payment.failureReason = error_code || "UNKNOWN_ERROR";
//         payment.failureDescription = error_description || "No description provided by Razorpay.";
//         console.error(`Payment Failed for Order ${order_id}: ${payment.failureReason} - ${payment.failureDescription}`);
//         // ------------------------------------------------
        
//         await payment.save();

//         await Enrollment.findByIdAndUpdate(payment.enrollment, { paymentStatus: "failed" });
//       }
//     } else if (event.event === "refund.processed") {
//       const { payment_id, id: refundId } = event.payload.refund.entity;

//       const payment = await Payment.findOne({ transactionId: payment_id });
//       if (payment) {
//         payment.status = "refunded";
//         payment.refundId = refundId;
//         await payment.save();

//         await Enrollment.findByIdAndUpdate(payment.enrollment, { paymentStatus: "refunded" });
//       }
//     }

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     console.error("Webhook handling error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }





// app/api/razorpay/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectDB();

  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const type = event.event;

  // Extract IDs safely
  const payment = event.payload.payment?.entity;
  const order = event.payload.order?.entity;

  const orderId = payment?.order_id || order?.id;
  const paymentId = payment?.id;

  // SUCCESS CASE 1 (Primary)
  if (type === "payment.captured") {
    await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "paid" });
    await Payment.findOneAndUpdate(
      { orderId },
      { status: "success", transactionId: paymentId }
    );
    return NextResponse.json({ success: true });
  }

  // SUCCESS CASE 2 (Backup)
  if (type === "order.paid") {
    await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "paid" });
    await Payment.findOneAndUpdate(
      { orderId },
      { status: "success" }
    );
    return NextResponse.json({ success: true });
  }

  // FAILURE CASE
  if (type === "payment.failed") {
    await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "failed" });
    await Payment.findOneAndUpdate(
      { orderId },
      { status: "failed", transactionId: paymentId }
    );
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}

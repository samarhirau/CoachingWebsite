    // import { NextResponse } from "next/server";
    // import crypto from "crypto";
    // import connectDB from "@/lib/mongoDb";
    // import Enrollment from "@/models/Enrollment";
    // import Payment from "@/models/Payment";

    // export const dynamic = "force-dynamic";

    // export async function POST(req: Request) {
    //   await connectDB();

    //   const rawBody = await req.text();
    //   const signature = req.headers.get("x-razorpay-signature");

    //   const expected = crypto
    //     .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    //     .update(rawBody)
    //     .digest("hex");

    //   if (expected !== signature) {
    //     return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    //   }

    //   const event = JSON.parse(rawBody);
    //   const type = event.event;

    //   const payment = event.payload.payment?.entity;
    //   const order = event.payload.order?.entity;

    //   const orderId = payment?.order_id || order?.id;
    //   const paymentId = payment?.id;

    //   if (!orderId) return NextResponse.json({ success: true });

    //   // 1️⃣ PAYMENT SUCCESS (captured)
    //   if (type === "payment.captured") {
    //     await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "paid" });
    //     await Payment.findOneAndUpdate(
    //       { orderId },
    //       { status: "success", transactionId: paymentId, paidAt: new Date() }
    //     );
    //     return NextResponse.json({ success: true });
    //   }

    //   // 2️⃣ BACKUP SUCCESS
    //   if (type === "order.paid") {
    //     await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "paid" });
    //     await Payment.findOneAndUpdate(
    //       { orderId },
    //       { status: "success", paidAt: new Date() }
    //     );
    //     return NextResponse.json({ success: true });
    //   }

    //   // 3️⃣ FAILURE
    //   if (type === "payment.failed") {
    //     await Enrollment.findOneAndUpdate({ orderId }, { paymentStatus: "failed" });
    //     await Payment.findOneAndUpdate(
    //       { orderId },
    //       { status: "failed", transactionId: paymentId }
    //     );
    //     return NextResponse.json({ success: true });
    //   }

    //   return NextResponse.json({ success: true });
    // }
    // working code above

    import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  await connectDB();

  const rawBody = await req.text();
  const receivedSignature = req.headers.get("x-razorpay-signature") || "";

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== receivedSignature) {
    console.warn("Invalid webhook signature");
    return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const type = event.event;

  // fetch orderId safely from payload
  const paymentEntity = event.payload?.payment?.entity;
  const orderEntity = event.payload?.order?.entity;

  const orderId = paymentEntity?.order_id || orderEntity?.id;
  const paymentId = paymentEntity?.id;

  if (!orderId) return NextResponse.json({ success: true });

  // find payment by orderId (we upserted it on create-order)
  const paymentDoc = await Payment.findOne({ orderId });

  // If payment record not found, nothing to update (safe exit)
  if (!paymentDoc) {
    console.log("Webhook: no Payment doc for orderId", orderId);
    return NextResponse.json({ success: true });
  }

  const enrollmentId = paymentDoc.enrollment;

  // SUCCESS: payment captured or order paid
  if (type === "payment.captured" || type === "order.paid") {
    await Payment.findOneAndUpdate(
      { orderId },
      { status: "success", transactionId: paymentId || paymentDoc.transactionId, paidAt: new Date() }
    );
    if (enrollmentId) {
      await Enrollment.findByIdAndUpdate(enrollmentId, { paymentStatus: "paid", paymentId: paymentId || paymentDoc.transactionId });
    }
    return NextResponse.json({ success: true });
  }

  // FAILED
  if (type === "payment.failed") {
    await Payment.findOneAndUpdate({ orderId }, { status: "failed", transactionId: paymentId || paymentDoc.transactionId });
    if (enrollmentId) {
      await Enrollment.findByIdAndUpdate(enrollmentId, { paymentStatus: "failed" });
    }
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: true });
}

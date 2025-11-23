



// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";

// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

// export async function POST(req: Request) {
//   await connectDB();
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollmentId } = await req.json();

//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !enrollmentId) {
//     return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
//   }

//   // 1️⃣ Generate signature
//   const generated_signature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (generated_signature === razorpay_signature) {
//     // 2️⃣ Update Enrollment
//     await Enrollment.findByIdAndUpdate(enrollmentId, {
//       paymentId: razorpay_payment_id,
//       paymentStatus: "paid",
//     });

//     // 3️⃣ Update Payment record
//     await Payment.findOneAndUpdate(
//       { enrollment: enrollmentId },
//       {
//         status: "success",
//         transactionId: razorpay_payment_id,
//         paidAt: new Date(),
//       }
//     );

//     return NextResponse.json({ success: true });
//   } else {
//     // Mark enrollment as failed
//     await Enrollment.findByIdAndUpdate(enrollmentId, { paymentStatus: "failed" });

//     // Update Payment record as failed
//     await Payment.findOneAndUpdate(
//       { enrollment: enrollmentId },
//       { status: "failed" }
//     );

//     return NextResponse.json({ success: false, message: "Payment verification failed" });
//   }
// }








// app/api/razorpay/verify-payment/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await connectDB();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollmentId } = await req.json();

  try {
    // Generate signature using live key secret
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const enrollment = await Enrollment.findById(enrollmentId);
    const payment = await Payment.findOne({ orderId: razorpay_order_id });

    if (!enrollment || !payment) {
      return NextResponse.json({ success: false, message: "Enrollment or Payment not found" }, { status: 404 });
    }

    if (generated_signature === razorpay_signature) {
      // Signature matches → mark paid
      enrollment.paymentStatus = "paid";
      payment.status = "paid";
      payment.transactionId = razorpay_payment_id;
      payment.paidAt = new Date();

      await enrollment.save();
      await payment.save();

      return NextResponse.json({ success: true });
    } else {
      // Signature mismatch → don't mark as failed yet
      console.warn("Razorpay signature mismatch, rely on webhook for final status");
      return NextResponse.json({ success: true, message: "Signature mismatch, payment may still be successful. Webhook will update status." });
    }
  } catch (err: any) {
    console.error("Verify payment error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}


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

//   const generated_signature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (generated_signature === razorpay_signature) {
//     await Enrollment.findByIdAndUpdate(enrollmentId, {
//       paymentId: razorpay_payment_id,
//       paymentStatus: "paid",
//     });

   


//     return NextResponse.json({ success: true });
//   } else {
//     await Enrollment.findByIdAndUpdate(enrollmentId, { paymentStatus: "failed" });
//     return NextResponse.json({ success: false, message: "Payment verification failed" });
//   }
// }






















import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  await connectDB();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, enrollmentId } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !enrollmentId) {
    return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
  }

  // 1️⃣ Generate signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    // 2️⃣ Update Enrollment
    await Enrollment.findByIdAndUpdate(enrollmentId, {
      paymentId: razorpay_payment_id,
      paymentStatus: "paid",
    });

    // 3️⃣ Update Payment record
    await Payment.findOneAndUpdate(
      { enrollment: enrollmentId },
      {
        status: "success",
        transactionId: razorpay_payment_id,
        paidAt: new Date(),
      }
    );

    return NextResponse.json({ success: true });
  } else {
    // Mark enrollment as failed
    await Enrollment.findByIdAndUpdate(enrollmentId, { paymentStatus: "failed" });

    // Update Payment record as failed
    await Payment.findOneAndUpdate(
      { enrollment: enrollmentId },
      { status: "failed" }
    );

    return NextResponse.json({ success: false, message: "Payment verification failed" });
  }
}


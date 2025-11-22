
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


export const dynamic = "force-dynamic";
export const runtime = "nodejs";


import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const payload = await req.json();
    console.log("Webhook payload:", payload);

    // ⭐ Handle Cashfree Test Webhook (No data.order, No data.payment)
    if (!payload?.data?.order || !payload?.data?.payment) {
      console.log("Cashfree TEST webhook received.");

      return NextResponse.json({
        success: true,
        message: "Test webhook processed successfully",
      });
    }

    // ⭐ Extract real payment details (Live/Sandbox)
    const orderId = payload.data.order.order_id;
    const paymentStatus = payload.data.payment.payment_status;
    const transactionId = payload.data.payment.cf_payment_id;
    const paymentTime = payload.data.payment.payment_time;

    // ⭐ Find payment entry
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      console.error("Payment not found for order:", orderId);
      return NextResponse.json({ success: false, message: "Payment not found" }, { status: 404 });
    }

    // ⭐ Update payment
    payment.status = paymentStatus === "SUCCESS" ? "success" : "failed";
    payment.transactionId = transactionId;
    payment.paidAt = paymentStatus === "SUCCESS" ? new Date(paymentTime) : null;
    await payment.save();

    // ⭐ Update enrollment
    const enrollment = await Enrollment.findById(payment.enrollment);
    if (enrollment) {
      enrollment.paymentStatus = paymentStatus === "SUCCESS" ? "paid" : "failed";
      enrollment.paymentId = transactionId;
      await enrollment.save();
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Webhook Error:", err.message || err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

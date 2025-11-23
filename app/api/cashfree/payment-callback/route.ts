
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


// app/api/cashfree/payment-callback/route.ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Webhook Signature Verification Function
function verifySignature(rawBody: string, signature: string): boolean {
  // .env से Webhook Secret Key प्राप्त करें
  const secret = process.env.CASHFREE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("CASHFREE_WEBHOOK_SECRET is not set in environment variables.");
    // सुरक्षा कारणों से, secret न मिलने पर verification विफल कर दें
    return false;
  }

  // Cashfree SHA256 Hmac hashing algorithm का उपयोग करता है
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64"); // Cashfree base64 encode करता है

  // signature का मिलान करें
  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    // 1. Raw Body प्राप्त करें (Signature Verification के लिए आवश्यक)
    const rawBody = await req.text();
    // Cashfree 'x-webhook-signature' या 'x-cf-signature' header का उपयोग करता है
    const signature = req.headers.get("x-webhook-signature");
    
    if (!signature) {
        console.log("❌ Webhook Signature Header missing.");
        return NextResponse.json({ success: false, message: "Signature missing" }, { status: 400 });
    }

    // 2. Signature Verify करें
    if (!verifySignature(rawBody, signature)) {
      console.log("❌ Invalid Webhook signature provided.");
      // 401 Unauthorized response दें
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
    }

    // 3. Raw Body को JSON में Parse करें
    const payload = JSON.parse(rawBody);
    console.log("✅ Verified Webhook Payload:", payload);

    // 4. आवश्यक डेटा निकालें
    const orderId = payload?.data?.order?.order_id;
    const paymentStatus = payload?.data?.payment?.payment_status; // e.g., SUCCESS, FAILED
    const transactionId = payload?.data?.payment?.cf_payment_id;
    const paymentTime = payload?.data?.payment?.payment_time;
    
    // Webhook को तुरंत Ack करने के लिए early exit
    if (payload.type === 'ORDER_CREATED') {
         return NextResponse.json({ success: true, message: "Order created acknowledged" });
    }

    if (!orderId || !paymentStatus) {
       console.error("Missing critical data in payload:", { orderId, paymentStatus });
       return NextResponse.json({ success: false, message: "Missing order_id or payment_status" }, { status: 400 });
    }
    
    // 5. Database अपडेट लॉजिक
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
        console.error("Payment record not found for:", orderId);
        // Cashfree को success response देना बेहतर है ताकि वे retry न करें
        return NextResponse.json({ success: true, message: "Order processed before or not found" }, { status: 200 });
    }

    // केवल तभी अपडेट करें जब वर्तमान status 'pending' हो
    if (payment.status !== 'pending') {
        return NextResponse.json({ success: true, message: "Payment already processed" }, { status: 200 });
    }

    const isSuccess = paymentStatus === "SUCCESS";
    payment.status = isSuccess ? "success" : "failed";
    payment.transactionId = transactionId;
    payment.paidAt = isSuccess ? new Date(paymentTime) : null;
    await payment.save();

    // Enrollment status अपडेट करें
    const enrollment = await Enrollment.findById(payment.enrollment);
    if (enrollment) {
      enrollment.paymentStatus = isSuccess ? "paid" : "failed";
      enrollment.paymentId = transactionId;
      await enrollment.save();
    }

    // 6. Cashfree को success response दें
    return NextResponse.json({ success: true, message: "Webhook processed successfully" });

  } catch (err: any) {
    console.error("Webhook Processing Error:", err.message);
    // 500 Internal Server Error response दें
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}






// app/api/cashfree/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const timestamp = req.headers.get("x-webhook-timestamp") || "";
    const signature = req.headers.get("x-webhook-signature") || "";

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!)
      .update(timestamp + rawBody)
      .digest("base64");

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 401 });
    }

    // Verified payload
    const payload = JSON.parse(rawBody);
    console.log("Webhook verified:", payload);

    // TODO: Handle payment / refund / subscription events
    const orderId = payload?.data?.order?.order_id;
    const paymentStatus = payload?.data?.payment?.payment_status;
    const transactionId = payload?.data?.payment?.cf_payment_id;
    const paymentTime = payload?.data?.payment?.payment_time;
    
    // Webhook को तुरंत Ack करने के लिए early exit
    if (payload.type === 'ORDER_CREATED') {
         return NextResponse.json({ success: true, message: "Order created acknowledged" });
    }

    if (!orderId || !paymentStatus) {
       console.error("Missing critical data in payload:", { orderId, paymentStatus });
       return NextResponse.json({ success: false, message: "Missing order_id or payment_status" }, { status: 400 });
    }
    
    // 5. Database अपडेट लॉजिक
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
        console.error("Payment record not found for:", orderId);
        // Cashfree को success response देना बेहतर है ताकि वे retry न करें
        return NextResponse.json({ success: true, message: "Order processed before or not found" }, { status: 200 });
    }

    // केवल तभी अपडेट करें जब वर्तमान status 'pending' हो
    if (payment.status !== 'pending') {
        return NextResponse.json({ success: true, message: "Payment already processed" }, { status: 200 });
    }

    const isSuccess = paymentStatus === "SUCCESS";
    payment.status = isSuccess ? "success" : "failed";
    payment.transactionId = transactionId;
    payment.paidAt = isSuccess ? new Date(paymentTime) : null;
    await payment.save();

    // Enrollment status अपडेट करें
    const enrollment = await Enrollment.findById(payment.enrollment);
    if (enrollment) {
      enrollment.paymentStatus = isSuccess ? "paid" : "failed";
      enrollment.paymentId = transactionId;
      await enrollment.save();
    }

    // 6. Cashfree को success response दें
    return NextResponse.json({ success: true, message: "Webhook processed successfully" });

  } catch (err: any) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

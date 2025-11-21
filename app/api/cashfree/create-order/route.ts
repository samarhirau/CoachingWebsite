export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { studentId, courseId, amount, formData } = await req.json();

    if (!studentId || !courseId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    console.log("[ENROLL] studentId:", studentId, "courseId:", courseId);

    // Check if enrollment exists
    let enrollment = await Enrollment.findOne({ studentId, courseId });

    if (enrollment && enrollment.paymentStatus === "paid") {
      return NextResponse.json({
        success: false,
        alreadyEnrolled: true,
        message: "You are already enrolled and payment is completed.",
        enrollmentId: enrollment._id,
      });
    }

    if (!enrollment) {
      enrollment = await Enrollment.create({
        studentId,
        courseId,
        formData,
        amount,
        paymentStatus: "pending",
      });
      console.log("[ENROLL] Created new enrollment:", enrollment._id);
    } else {
      // Retry after failed payment
      enrollment.paymentStatus = "pending";
      await enrollment.save();
      console.log("[ENROLL] Retrying enrollment:", enrollment._id);
    }

    // Unique orderId for this payment
    const orderId = uuidv4().replace(/-/g, "").slice(0, 10);
    console.log("[PAYMENT] Creating payment with orderId:", orderId);

    const payment = await Payment.create({
      student: studentId,
      course: courseId,
      amount,
      status: "pending",
      enrollment: enrollment._id,
      orderId,
    });

    // Cashfree order creation
    const cfResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: studentId,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
        },
        order_meta: {
          return_url: `${process.env.NEXTAUTH_URL}/payment-status?order_id={order_id}`,
          notify_url: `${process.env.NEXTAUTH_URL}/api/cashfree/payment-callback`,
        },
      }),
    });

    const data = await cfResponse.json();
    console.log("[CF ORDER] Response:", data);

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment._id,
      orderId: data.order_id,
      paymentLink: data.payment_link,
      paymentSessionId: data.payment_session_id,
    });

  } catch (err: any) {
    console.error("Create Order Error:", err.message || err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

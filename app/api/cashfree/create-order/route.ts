import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";
import { v4 as uuidv4 } from "uuid";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { studentId, courseId, amount, formData } = await req.json();

    if (!studentId || !courseId || !amount) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Check enrollment
    let enrollment = await Enrollment.findOne({ studentId, courseId });
    if (enrollment && enrollment.paymentStatus === "paid") {
      return NextResponse.json({
        success: false,
        alreadyEnrolled: true,
        message: "Already enrolled and paid",
        enrollmentId: enrollment._id,
      });
    }

    if (!enrollment) {
      enrollment = await Enrollment.create({ studentId, courseId, formData, amount });
    } else {
      enrollment.paymentStatus = "pending";
      await enrollment.save();
    }

    // Payment order
    const orderId = uuidv4().replace(/-/g, "").slice(0, 10);
    const payment = await Payment.create({ student: studentId, course: courseId, amount, enrollment: enrollment._id, orderId });

    // Cashfree API
    const cfResponse = await fetch("https://api.cashfree.com/pg/orders", {
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
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-status?order_id={order_id}`,
          notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/cashfree/payment-callback`,
        },
      }),
    });

    const data = await cfResponse.json();
    return NextResponse.json({ success: true, enrollmentId: enrollment._id, orderId: data.order_id, paymentLink: data.payment_link, paymentSessionId: data.payment_session_id });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

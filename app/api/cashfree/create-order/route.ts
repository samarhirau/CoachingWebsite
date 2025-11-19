


import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import axios from "axios";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { studentId, courseId, amount, formData } = await req.json();


    const existing = await Enrollment.findOne({ studentId, courseId });

if (existing) {
  return NextResponse.json(
    {
      success: false,
      alreadyEnrolled: true,
      enrollmentId: existing._id,
      message: "You are already enrolled in this course."
    },
    { status: 200 }
  );
}

    // 1. Create enrollment
    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      formData,
      amount,
    });

    // 2. Create Cashfree Order (returns payment_link)
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_id: enrollment._id.toString(),
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
          notify_url: "",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        },
      }
    );

    // 3. MUST return payment_link for redirect flow
    return NextResponse.json({
      success: true,
      orderId: response.data.order_id,
      paymentLink: response.data.payment_link,
      paymentSessionId: response.data.payment_session_id,
    });

  } catch (err: any) {
    console.error("Cashfree Error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: 500 }
    );
  }
}

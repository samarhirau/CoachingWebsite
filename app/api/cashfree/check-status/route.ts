


// app/api/cashfree/check-status/route.ts
import axios from "axios";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";
import "@/models/Course";



export const dynamic = 'force-dynamic';

export async function GET(req: { url: string | URL }) {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId missing" });
    }

    // 1️⃣ Fetch enrollment from DB
    const enrollment = await Enrollment.findById(orderId).populate("courseId");
    if (!enrollment) {
      return NextResponse.json({ success: false, message: "Enrollment not found" });
    }

    // 2️⃣ Fetch payment info from DB
    const payment = await Payment.findOne({ enrollment: enrollment._id });

    // 3️⃣ Optional: Get Cashfree order status
    let cfStatus = null;
    try {
      const cfResponse = await axios.get(`https://sandbox.cashfree.com/pg/orders/${orderId}`, {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "x-api-version": "2022-09-01",
        },
      });
      cfStatus = cfResponse.data;
    } catch (err) {
      console.warn("Cashfree API fetch failed, using DB status only");
    }

    return NextResponse.json({
      success: true,
      payment: {
        orderId: orderId,
        paymentId: payment?.transactionId || null,
        orderStatus: enrollment.paymentStatus || (cfStatus?.order_status ?? "pending"),
        orderAmount: enrollment.amount,
        paymentSessionId: cfStatus?.payment_session_id || null,
        studentName: enrollment.formData?.firstName + " " + enrollment.formData?.lastName,
        studentEmail: enrollment.formData?.email,
        courseName: enrollment.courseId?.title || "Course",
      },
    });
  } catch (err: any) {
    console.error("Check status error:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: err.response?.data || err.message });
  }
}





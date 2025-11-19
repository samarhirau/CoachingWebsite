// app/api/cashfree/payment-callback/route.ts
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payment";

export async function GET(req: NextRequest) {
  await connectDB();

  const url = new URL(req.url);
  const orderId = url.searchParams.get("orderId");
  const orderStatus = url.searchParams.get("order_status");
  const transactionId = url.searchParams.get("transaction_id");

  if (!orderId) return NextResponse.redirect("/error");

  const enrollment = await Enrollment.findById(orderId);
  if (!enrollment) return NextResponse.redirect("/error");

  enrollment.paymentStatus = orderStatus || "pending";
  enrollment.paymentId = transactionId || "";
  
  await enrollment.save();

     const payment = await Payment.create({
      student: enrollment.student,
      course: enrollment.course,
      amount: (enrollment.amount ?? 0),
      paymentMethod: url.searchParams.get("payment_method") || "card",
      status: orderStatus || "success",
      paidAt: new Date(),
      cashfreeOrderId: orderId,
      cashfreePaymentId: transactionId || ""
    });

    await payment.save();



  return NextResponse.redirect(`/success?enrollmentId=${enrollment._id}`);
}

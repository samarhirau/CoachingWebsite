import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: Request) {
  const body = await req.json();

  try {
    if (body.type === "order") {
      const { amount } = body;
      const order = await razorpay.orders.create({
        amount: Number(amount) * 100, // paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });
      return NextResponse.json({ success: true, order });
    }

    if (body.type === "verify") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
        .update(sign)
        .digest("hex");

      if (razorpay_signature === expectedSign)
        return NextResponse.json({ success: true });
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: false, message: "Invalid type" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false });
  }
}

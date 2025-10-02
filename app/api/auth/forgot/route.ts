import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import User from "@/models/User";
import { sendOtpEmail } from "@/lib/mailService";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP and expiry (5 min)
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await user.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error: any) {
    console.error("Error in forgot password:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP", error: error.message }, { status: 500 });
  }
}

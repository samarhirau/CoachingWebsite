import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth"; // agar tumhara password hashing function hai

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Optional: check if OTP was verified
    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      return NextResponse.json({ success: false, message: "OTP not verified or expired" }, { status: 400 });
    }

    // Hash password and save
    user.password = await hashPassword(password);
    user.otp = undefined;        // clear OTP after reset
    user.otpExpiry = undefined;  // clear OTP expiry
    await user.save();

    return NextResponse.json({ success: true, message: "Password reset successfully" });
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ success: false, message: "Failed to reset password", error: error.message }, { status: 500 });
  }
}

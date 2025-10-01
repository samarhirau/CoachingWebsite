import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/mailService";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await sendOtpEmail(email, otp);

    return NextResponse.json({ success: true, message: "OTP sent successfully", otp, brevoResult: result });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP", error: error.message }, { status: 500 });
  }
}

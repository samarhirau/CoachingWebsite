import { NextResponse } from "next/server";
import { sendNewsletter } from "@/lib/mailService";

export async function POST(req: Request) {
  try {
    const { emails, subject, html } = await req.json();

    const result = await sendNewsletter(emails, subject, html);

    return NextResponse.json({
      success: true,
      message: "Newsletter sent successfully",
      brevoResult: result,
    });
  } catch (error: any) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send newsletter", error: error.message },
      { status: 500 }
    );
  }
}

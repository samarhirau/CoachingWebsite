import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Newsletter from "@/models/NewsLatter";
import { sendNewsletter } from "@/lib/services/sendmailtrap";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { ids } = await req.json();
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No subscribers selected." },
        { status: 400 }
      );
    }

    // Find subscribers by _id
    const subscribers = await Newsletter.find({ _id: { $in: ids } }).select("email");
    const emails = subscribers.map((sub) => sub.email);

    if (emails.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid subscribers found." },
        { status: 400 }
      );
    }

    // Send newsletter
    await sendNewsletter(emails);

    return NextResponse.json({ success: true, message: "Emails sent successfully." });
  } catch (error: any) {
    console.error("Error sending newsletters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send emails." },
      { status: 500 }
    );
  }
}

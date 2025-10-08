import connectDB from "@/lib/mongoDb";
import Newsletter from "@/models/NewsLatter";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "You are already subscribed!" },
        { status: 200 }
      );
    }

    const newSubscriber = await Newsletter.create({ email });

    return NextResponse.json(
      { message: "Subscribed successfully!", data: newSubscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}

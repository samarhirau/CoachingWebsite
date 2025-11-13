import connectDB from "@/lib/mongoDb";
import Newsletter from "@/models/NewsLatter";
import { NextResponse } from "next/server";

// GET all subscribed emails
export async function GET() {
  try {
    await connectDB();

    const newsletters = await Newsletter.find().sort({ createdAt: -1 }); // latest first

    return NextResponse.json({
      success: true,
      data: newsletters,
    });
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch newsletters." },
      { status: 500 }
    );
  }
}

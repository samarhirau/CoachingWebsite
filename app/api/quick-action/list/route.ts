import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Action from "@/models/Action";


export const dynamic = "force-dynamic";


export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    const actions = await Action.find({ status: "Pending" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Action.countDocuments({ status: "Pending" });

    return NextResponse.json({
      success: true,
      data: actions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("❌ LIST ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch actions" },
      { status: 500 }
    );
  }
}

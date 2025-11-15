import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Action from "@/models/Action";

const DELETE_AFTER_HOURS = 24;

export async function POST(req: Request) {
  try {
    await connectDB();
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid IDs provided" },
        { status: 400 }
      );
    }

    await Action.updateMany(
      { _id: { $in: ids } },
      { $set: { status: "Processed", processedAt: new Date() } }
    );

    // Auto delete processed after X hours (cleanup)
    setTimeout(async () => {
      await Action.deleteMany({
        status: "Processed",
        processedAt: {
          $lte: new Date(Date.now() - DELETE_AFTER_HOURS * 60 * 60 * 1000),
        },
      });
    }, 1000); // runs in background after request

    return NextResponse.json({
      success: true,
      message: `Processed (${ids.length}) action(s)`,
    });
  } catch (error) {
    console.error("❌ PROCESS ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Processing failed" },
      { status: 500 }
    );
  }
}

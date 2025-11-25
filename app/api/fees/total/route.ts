import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Payment from "@/models/Payment";

export async function GET() {
  try {
    await connectDB();

    const result = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalFees: { $sum: "$amount" } } }
    ]);

    const totalFees = result[0]?.totalFees || 0;

    return NextResponse.json({ totalFees });
  } catch (error) {
    console.error("Error fetching total fees:", error);
    return NextResponse.json({ totalFees: 0 }, { status: 500 });
  }
}

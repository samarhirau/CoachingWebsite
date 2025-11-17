import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(filter)
    .sort({ createdAt: -1 }) // newest first
    .lean(); // optimizes performance

  return NextResponse.json(users);
}

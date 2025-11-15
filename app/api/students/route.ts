import { NextResponse } from "next/server";
import  connectDB  from "@/lib/mongoDb";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);

  const filter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const users = await User.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

  return NextResponse.json({ users, total });
}

import { NextResponse } from "next/server";
import  connectDB  from "@/lib/mongoDb";
import User from "@/models/User";

export async function DELETE(_: Request, { params }: any) {
  await connectDB();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import Action from "@/models/Action"; 
import connectDB from "@/lib/mongoDb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { action, userId } = await req.json();

    if (!action || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newAction = await Action.create({
      name: action,
      userId,
    });

    return NextResponse.json(
      { message: "Action stored successfully", data: newAction },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving action:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

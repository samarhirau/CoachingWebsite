export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;


import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Contact from "@/models/Contact";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: contacts,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}

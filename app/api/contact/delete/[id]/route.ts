export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;


import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Contact from "@/models/Contact";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    await Contact.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}

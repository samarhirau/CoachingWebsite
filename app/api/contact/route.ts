import { NextResponse } from "next/server";
import  connectDB  from "@/lib/mongoDb";
import Contact from "@/models/Contact";


export async function POST(req: Request) {
  try {
    const { name, email, inquiryType ,phone, course, message } = await req.json();

    if (!name  || !email || !phone || !course || !message || !inquiryType) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create({
     name,
      email,
      phone,
      course,
      message,
      inquiryType
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact form:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}

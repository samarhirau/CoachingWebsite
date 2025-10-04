// app/api/course/list/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Course from "@/models/Course";

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      courses: courses.map(course => ({
        _id: course._id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        duration: course.duration,
        studentsCount: course.students?.length || 0,
        rating: course.rating || 0,
        price: course.price || 0,
        originalPrice: course.originalPrice || 0,
        features: course.features || [],
        professor: course.professor || "",
        maxStudents: course.maxStudents || 0,
        contactNumber: course.contactNumber || "",
        level: "Beginner to Advanced"
      }))
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, courses: [] }, { status: 500 });
  }
}

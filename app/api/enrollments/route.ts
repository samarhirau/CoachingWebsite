// // app/api/enrollments/route.ts
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Course from "@/models/Course";


// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const { studentId, courseId, formData } = body;

//     if (!studentId || !courseId) {
//       return NextResponse.json({ message: "Missing studentId or courseId" }, { status: 400 });
//     }

//     // Check for existing enrollment
//     const existingEnrollment = await Enrollment.findOne({
//       studentId,
//       courseId,
//     });

//     if (existingEnrollment) {
//       return NextResponse.json({ message: "Already enrolled in this course" }, { status: 400 });
//     }
//     const enrollment = new Enrollment({
//       studentId,
//       courseId,
//       formData,
//     });

//     await enrollment.save();

//     return NextResponse.json({ message: "Enrollment successful!", enrollment }, { status: 201 });
//   } catch (error: any) {
//     // console.error("Enrollment API error:", error);
//     return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
//   }
// }





// export async function GET(req: Request) {
//   try {
//     await connectDB()

//     // Dynamically load Course model (registers it globally in Mongoose)
//     await import("@/models/Course")

//     const url = new URL(req.url)
//     const studentId = url.searchParams.get("studentId")

//     if (!studentId) {
//       return NextResponse.json({ error: "Missing studentId" }, { status: 400 })
//     }

//     const enrollments = await Enrollment.find({ studentId }).populate("courseId")

//     const formatted = enrollments.map((e) => ({
//       studentId: e.studentId,
//       course: e.courseId,
//     }))

//     return NextResponse.json({ enrollments: formatted }, { status: 200 })
//   } catch (error: any) {
//     console.error("GET /api/enrollments error:", error)
//     return NextResponse.json(
//       { error: "Server error", details: error.message },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDb"
import Enrollment from "@/models/Enrollment"

export async function POST(req: Request) {
  try {
    await connectDB()

    const { studentId, courseId, formData } = await req.json()

    if (!studentId || !courseId) {
      return NextResponse.json(
        { success: false, error: "studentId and courseId are required" },
        { status: 400 }
      )
    }

    const enrollment = await Enrollment.findOneAndUpdate(
      { studentId, courseId },
      { studentId, courseId, formData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return NextResponse.json({
      success: true,
      message: "Enrolled successfully",
      enrollment,
    })
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Already enrolled" },
        { status: 409 }
      )
    }

    console.error("Enrollment Error:", err)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

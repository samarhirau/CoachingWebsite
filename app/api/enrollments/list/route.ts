// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Course from "@/models/Course";

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const url = new URL(req.url);
//     const studentId = url.searchParams.get("studentId");

//     if (!studentId) {
//       return NextResponse.json(
//         { success: false, message: "studentId missing" },
//         { status: 400 }
//       );
//     }

//     console.log("Received studentId:", studentId);

//     const enrollments = await Enrollment.find({
//       studentId: studentId, // make sure field name is correct
//     })
//       .populate("courseId")
//       .lean();

//     console.log("Enrollments from DB:", enrollments);

//     return NextResponse.json({
//       success: true,
//       courses: enrollments.map((e) => ({
//         ...e.courseId,
//         status: "enrolled",
//       })),
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Server Error" },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";


import "@/models/Course";


export async function GET(req: Request) {
  try {
    console.log("🔌 Connecting DB...");
    await connectDB();
    console.log("✅ DB connected");

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    console.log("📩 studentId =", studentId);

    if (!studentId) {
      return NextResponse.json(
        { success: false, message: "studentId missing" },
        { status: 400 }
      );
    }

    console.log("📦 Fetching enrollments...");

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId")
      .lean();

    console.log("📊 Enrollments:", JSON.stringify(enrollments, null, 2));

    return NextResponse.json({
      success: true,
      courses: enrollments.map((e) => ({
        ...e.courseId,
        status: "enrolled",
      })),
    });
  } catch (error: any) {
    console.error("🔥 SERVER ERROR", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

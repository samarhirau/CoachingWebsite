
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";
// import "@/models/Course";

// export const dynamic = "force-dynamic";

// export async function GET(req: Request) {
//   try {
//     await connectDB();

//     const url = new URL(req.url);
//     const studentId = url.searchParams.get("studentId");

//     if (!studentId) {
//       return NextResponse.json({ success: false, message: "studentId missing" }, { status: 400 });
//     }

//     const enrollments = await Enrollment.find({ studentId })
//       .populate("courseId")
//       .lean();

//     const paidEnrollments = [];

//     for (const enrollment of enrollments) {
//       const payment = await Payment.findOne({
//         enrollment: enrollment._id,
//         status: "success", // ✅ match webhook
//       });

//       if (payment && enrollment.courseId) {
//         paidEnrollments.push({
//           ...enrollment.courseId,
//           enrollmentId: enrollment._id,
//           status: "success",
//           amount: enrollment.amount,
//         });
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       courses: paidEnrollments,
//     });
//   } catch (error: any) {
//     console.error("SERVER ERROR", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Server Error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";
import "@/models/Course";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");

    if (!studentId) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "studentId missing" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    // 1️⃣ Get all successful payments for this student
    const payments = await Payment.find({
      student: studentId,
      status: "success",
    })
      .select("enrollment")
      .lean();

    const successfulEnrollmentIds = payments.map((p) => p.enrollment);

    // 2️⃣ Get matching enrollments with course populated
    const enrollments = await Enrollment.find({
      _id: { $in: successfulEnrollmentIds },
    })
      .populate("courseId")
      .lean();

    // 3️⃣ Transform output
    const courses = enrollments.map((enrollment) => ({
      ...enrollment.courseId,
      enrollmentId: enrollment._id,
      amount: enrollment.amount,
      status: "success",
    }));

    return new NextResponse(
      JSON.stringify({
        success: true,
        courses,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("SERVER ERROR /api/enrollments/list", error);

    return new NextResponse(
      JSON.stringify({
        success: false,
        message: error.message || "Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}


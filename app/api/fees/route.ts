
// export const dynamic = "force-dynamic";

// import { NextResponse } from "next/server";
// import connectDb from "@/lib/mongoDb";
// import Payment from "@/models/Payment";

// export async function GET(request: Request) {
//   await connectDb();

//   const { searchParams } = new URL(request.url);
//   const limit = parseInt(searchParams.get("limit") || "100");
//   const search = searchParams.get("search") || "";

//   const match: any = {};

//   if (search) {
//     match.$or = [
//       { orderId: { $regex: search, $options: "i" } },
//       { transactionId: { $regex: search, $options: "i" } },
//       { "studentData.email": { $regex: search, $options: "i" } },
//       { "courseData.title": { $regex: search, $options: "i" } },
//       { "courseData.name": { $regex: search, $options: "i" } }
//     ];
//   }

//   const payments = await Payment.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "student",
//         foreignField: "_id",
//         as: "studentData"
//       }
//     },
//     { $unwind: "$studentData" },
//     {
//       $lookup: {
//         from: "courses",
//         localField: "course",
//         foreignField: "_id",
//         as: "courseData"
//       }
//     },
//     { $unwind: "$courseData" },
//     {
//       $match: match
//     },
//     {
//       $project: {
//         orderId: 1,
//         transactionId: 1,
//         amount: 1,
//         status: 1,
//         createdAt: 1,
//         studentEmail: "$studentData.email",
//         courseTitle: { $ifNull: ["$courseData.title", "$courseData.name"] }
//       }
//     },
//     {
//       $sort: { createdAt: -1 }
//     },
//     {
//       $limit: limit
//     }
//   ]);

//   return NextResponse.json(payments);
// }
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import connectDb from "@/lib/mongoDb";
import Payment from "@/models/Payment";

export async function GET(request: Request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100");
  const search = searchParams.get("search") || "";

  const match: any = {};

  if (search) {
    match.$or = [
      { orderId: { $regex: search, $options: "i" } },
      { transactionId: { $regex: search, $options: "i" } },
      { "studentData.email": { $regex: search, $options: "i" } },
      { "courseData.title": { $regex: search, $options: "i" } },
      { "courseData.name": { $regex: search, $options: "i" } }
    ];
  }

  const payments = await Payment.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "student",
        foreignField: "_id",
        as: "studentData"
      }
    },
    {
      $unwind: {
        path: "$studentData",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "courses",
        localField: "course",
        foreignField: "_id",
        as: "courseData"
      }
    },
    {
      $unwind: {
        path: "$courseData",
        preserveNullAndEmptyArrays: true
      }
    },
    { $match: match },
    {
      $project: {
        orderId: 1,
        transactionId: 1,
        amount: 1,
        status: 1,
        createdAt: 1,
        studentEmail: "$studentData.email",
        courseTitle: { $ifNull: ["$courseData.title", "$courseData.name"] }
      }
    },
    { $sort: { createdAt: -1 } },
    { $limit: limit }
  ]);

  return NextResponse.json(payments);
}

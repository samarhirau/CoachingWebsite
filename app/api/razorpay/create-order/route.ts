




// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";

// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

// export async function POST(req: Request) {
//   await connectDB();
//   const { studentId, courseId, amount, formData } = await req.json();

//   if (!studentId || !courseId || !amount) {
//     return NextResponse.json(
//       { success: false, message: "Missing parameters" },
//       { status: 400 }
//     );
//   }

//   try {
//     // 1️⃣ Find existing enrollment
//     let enrollment = await Enrollment.findOne({ studentId, courseId });

//     if (enrollment) {
//       if (enrollment.paymentStatus === "paid") {
//         return NextResponse.json(
//           { success: false, message: "Already enrolled" },
//           { status: 400 }
//         );
//       }
//       // Update pending/failed enrollment
//       enrollment.formData = formData;
//       enrollment.amount = amount;
//       enrollment.paymentStatus = "pending";
//       await enrollment.save();
//     } else {
//       // Create new pending enrollment
//       enrollment = await Enrollment.create({
//         studentId,
//         courseId,
//         amount,
//         formData,
//         paymentStatus: "pending",
//       });
//     }

//     // 2️⃣ Create Razorpay order
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // in paise
//       currency: "INR",
//       receipt: enrollment._id.toString().slice(0, 40),
//     });

//     // 3️⃣ Upsert Payment record
//     await Payment.findOneAndUpdate(
//       { enrollment: enrollment._id },
//       {
//         student: studentId,
//         course: courseId,
//         amount,
//         status: "pending",
//         orderId: order.id,
//         enrollment: enrollment._id,
//         transactionId: "",
//         paidAt: undefined,
//       },
//       { upsert: true, new: true }
//     );

//     return NextResponse.json({ success: true, order, enrollment });
//   } catch (err: any) {
//     console.error("Razorpay Order Error:", err);
//     return NextResponse.json(
//       { success: false, message: err.message },
//       { status: 500 }
//     );
//   }
// }

// working code above



import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function POST(req: Request) {
  await connectDB();
  const { studentId, courseId, amount, formData } = await req.json();

  if (!studentId || !courseId || typeof amount !== "number") {
    return NextResponse.json({ success: false, message: "Missing parameters" }, { status: 400 });
  }

  try {
    let enrollment = await Enrollment.findOne({ studentId, courseId });

    if (enrollment) {
      if (enrollment.paymentStatus === "paid") {
        return NextResponse.json({ success: false, message: "Already enrolled" }, { status: 400 });
      }
      enrollment.formData = formData;
      enrollment.amount = amount;
      enrollment.paymentStatus = "pending";
      await enrollment.save();
    } else {
      enrollment = await Enrollment.create({
        studentId,
        courseId,
        amount,
        formData,
        paymentStatus: "pending",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: enrollment._id.toString(),
      notes: {
        enrollmentId: enrollment._id.toString()
      }
    });

    // save orderId on enrollment and upsert payment linked to enrollment
    enrollment.orderId = order.id;
    await enrollment.save();

    await Payment.findOneAndUpdate(
      { enrollment: enrollment._id },
      {
        student: studentId,
        course: courseId,
        amount,
        status: "pending",
        orderId: order.id,
        enrollment: enrollment._id,
        transactionId: "",
        paidAt: undefined,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, order, enrollment });
  } catch (err: any) {
    console.error("Razorpay Order Error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}


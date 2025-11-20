
// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import Payment from "@/models/Payment";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   await connectDB();

//   try {
//     const { studentId, courseId, amount, formData } = await req.json();


//     const existing = await Enrollment.findOne({ studentId, courseId });

// if (existing) {
//   return NextResponse.json(
//     {
//       success: false,
//       alreadyEnrolled: true,
//       enrollmentId: existing._id,
//       message: "You are already enrolled in this course."
//     },
//     { status: 200 }
//   );
// }

//     // 1. Create enrollment
//     const enrollment = await Enrollment.create({
//       studentId,
//       courseId,
//       formData,
//       amount,
//     });



//      const payment = await Payment.create({
//       student: studentId,
//       course: courseId,
//       amount: amount,
//       // paymentMethod: formData.paymentMethod || "card",
//       status: "pending",
//       enrollment: enrollment._id,
//     });

//     await payment.save();

//     // 2. Create Cashfree Order (returns payment_link)
//     const response = await axios.post(
//       "https://sandbox.cashfree.com/pg/orders",
//       {
//         order_id: enrollment._id.toString(),
//         order_amount: amount,
//         order_currency: "INR",

//         customer_details: {
//           customer_id: studentId,
//           customer_name: `${formData.firstName} ${formData.lastName}`,
//           customer_email: formData.email,
//           customer_phone: formData.phone,
//         },

//         order_meta: {
//           return_url: `${process.env.NEXTAUTH_URL}/payment-status?order_id={order_id}`,
//           notify_url: `${process.env.NEXTAUTH_URL}/api/cashfree/payment-callback`,
//         },
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "x-api-version": "2023-08-01",
//           "x-client-id": process.env.CASHFREE_APP_ID!,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
//         },
//       }
//     );

      

//     // 3. MUST return payment_link for redirect flow
//     return NextResponse.json({
//       success: true,
//       orderId: response.data.order_id,
//       paymentLink: response.data.payment_link,
//       paymentSessionId: response.data.payment_session_id,
//     });

//   } catch (err: any) {
//     console.error("Cashfree Error:", err.response?.data || err.message);
//     return NextResponse.json(
//       { error: err.response?.data || err.message },
//       { status: 500 }
//     );
//   }
// }











import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Payment from "@/models/Payment";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { studentId, courseId, amount, formData } = await req.json();

    if (!studentId || !courseId || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Check existing enrollment
    let enrollment = await Enrollment.findOne({ studentId, courseId });

    if (enrollment) {
      // Check if payment was successful
      const paidPayment = await Payment.findOne({
        enrollment: enrollment._id,
        status: "success",
      });

      if (paidPayment) {
        return NextResponse.json({
          success: false,
          alreadyEnrolled: true,
          message: "You are already enrolled and payment is completed.",
          enrollmentId: enrollment._id,
        });
      }
    } else {
      // Create enrollment if it doesn't exist
      enrollment = await Enrollment.create({
        studentId,
        courseId,
        formData,
        amount,
        paymentStatus: "pending",
      });
    }

    // 2️⃣ Create a new pending payment
    const payment = await Payment.create({
      student: studentId,
      course: courseId,
      amount,
      status: "pending",
      enrollment: enrollment._id,
    });

    // 3️⃣ Create Cashfree order
    const cfResponse = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      body: JSON.stringify({
        order_id: enrollment._id.toString(),
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: studentId,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
        },
                      order_meta: {
  return_url: "https://uncolourable-transparish-brigette.ngrok-free.dev/payment-status?order_id={order_id}",
  notify_url: "https://uncolourable-transparish-brigette.ngrok-free.dev/api/cashfree/payment-callback",
}
      }),
    });

    const data = await cfResponse.json();

    return NextResponse.json({
      success: true,
      enrollmentId: enrollment._id,
      orderId: data.order_id,
      paymentLink: data.payment_link,
      paymentSessionId: data.payment_session_id,
    });

  } catch (err: any) {
    console.error("Create Order Error:", err.message || err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}



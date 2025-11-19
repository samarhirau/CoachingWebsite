// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongoDb";
// import Enrollment from "@/models/Enrollment";
// import axios from "axios";

// export async function GET(req: NextRequest) {
//   await connectDB();

//   const orderId = req.nextUrl.searchParams.get("orderId");

//   if (!orderId)
//     return NextResponse.json({ success: false, message: "orderId missing" });

//   try {
//     // Get payment status from Cashfree
//     const response = await axios.get(
//       `https://sandbox.cashfree.com/pg/orders/${orderId}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID!,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
//           "x-api-version": "2023-08-01",
//         },
//       }
//     );

//     const order = response.data;

//     // Update DB
//     await Enrollment.findByIdAndUpdate(orderId, {
//       paymentStatus: order.order_status,
//     });

//     return NextResponse.json({
//       success: true,
//       orderStatus: order.order_status,
//     });
//   } catch (err: any) {
//     console.log(err.response?.data || err.message);
//     return NextResponse.json({ success: false });
//   }
// }



// import axios from "axios";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const orderId = searchParams.get("orderId");

//     if (!orderId) {
//       return Response.json(
//         { success: false, message: "orderId missing" },
//         { status: 400 }
//       );
//     }

//     const cashfreeRes = await axios.get(
//       `https://sandbox.cashfree.com/pg/orders/${orderId}`,
//       {
//         headers: {
//           "x-client-id": process.env.CASHFREE_APP_ID!,
//           "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
//           "x-api-version": "2023-08-01",
//         },
//       }
//     );

//     return Response.json({
//       success: true,
//           payment: {
//             orderId: cashfreeRes.data.order_id,
//                orderStatus: cashfreeRes.data.order_status,
//                orderAmount: cashfreeRes.data.order_amount,
//                paymentSessionId: cashfreeRes.data.payment_session_id,

//           }
      
//     });
//   } catch (err: any) {
//     return Response.json(
//       {
//         success: false,
//         error: err?.response?.data || err.message,
//       },
//       { status: 500 }
//     );
//   }
// }








import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: { url: string | URL; }) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId missing" });
    }

    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${orderId}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
        },
      }
    );

    const data = response.data;

    return NextResponse.json({
      success: true,
      payment: {
        orderId: data.order_id,
        orderStatus: data.order_status,
        orderAmount: data.order_amount,
        paymentSessionId: data.payment_session_id,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false });
  }
}

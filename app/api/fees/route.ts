import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import Payment from "@/models/Payment";

export const GET = async (req: NextRequest) => {
  await connectDB();

  try {
    const { search, limit } = Object.fromEntries(req.nextUrl.searchParams.entries());
    const limitNum = limit ? parseInt(limit, 10) : 10;

    const payments = await Payment.find(
      search
        ? {
            $or: [
              { transactionId: { $regex: search, $options: "i" } },
              { status: { $regex: search, $options: "i" } },
            ],
          }
        : {}
    )
      .populate("student", "name rollNo")
      .populate("course", "name")
      .sort({ createdAt: -1 })
      .limit(limitNum);

    const data = payments.map((p) => ({
      id: p._id.toString(),
      rollNo: (p.student as any)?.rollNo || "N/A",
      studentName: (p.student as any)?.name || "N/A",
      invoiceNumber: p.transactionId || "N/A",
      feesType: (p.course as any)?.name || "Tuition",
      paymentType: "Online", // or from model if you add field
      status: p.status === "success" ? "Paid" : p.status === "pending" ? "Pending" : "Unpaid",
      date: p.paidAt
        ? new Date(p.paidAt).toLocaleDateString()
        : new Date(p.createdAt).toLocaleDateString(),
      amount: p.amount,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

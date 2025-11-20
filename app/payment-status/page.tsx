



"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PaymentSuccess() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      setOrderId(url.searchParams.get("order_id"));
    }
  }, []);

  const { data, error, isLoading } = useSWR(
    orderId ? `/api/cashfree/check-status?orderId=${orderId}` : null,
    fetcher,
    { refreshInterval: 5000 } // optional polling every 5s
  );

  if (!orderId || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Checking Payment...</p>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-3xl font-bold text-red-600">Payment Failed ❌</h2>
          <p className="mt-3 text-gray-600">Unable to fetch payment details.</p>
        </div>
      </div>
    );
  }

  const payment = data.payment;

  console.log("Payment Data:", payment);

  // Generate PDF receipt
  // const generatePDF = async () => {
  //   const { jsPDF } = await import("jspdf");
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("Payment Receipt", 20, 20);

  //   doc.setFontSize(12);
  //   doc.text(`Order ID: ${payment.orderId}`, 20, 40);
  //   doc.text(`Payment ID: ${payment.paymentId || "N/A"}`, 20, 50);
  //   doc.text(`Name: ${payment.studentName}`, 20, 60);
  //   doc.text(`Email: ${payment.studentEmail}`, 20, 70);
  //   doc.text(`Course: ${payment.courseName}`, 20, 80);
  //   doc.text(`Amount Paid: ₹${payment.orderAmount}`, 20, 90);
  //   doc.text(`Payment Status: ${payment.orderStatus}`, 20, 100);
  //   doc.text(`Date: ${new Date().toLocaleString()}`, 20, 110);

  //   doc.save("receipt.pdf");
  // };

  const generatePDF = async () => {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();

  // ============================
  // HEADER SECTION
  // ============================
  doc.setFontSize(20);
  doc.setTextColor(30, 30, 30);
  doc.text("Invoice / Fees Receipt", 14, 20);

  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 20);
  doc.setTextColor(255, 165, 0);
  doc.text(`Status: ${payment.orderStatus}`, 160, 26);
  doc.setTextColor(0, 0, 0);

  // ============================
  // BILLING INFO
  // ============================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Billed From: Upcoder (Admin)", 14, 40);
  doc.text("Billed To: Student", 120, 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // LEFT SIDE
  doc.text("Upcoder Education", 14, 50);
  doc.text("#8801 Address Line, City", 14, 56);
  doc.text("Email: info@upcoder.creater", 14, 62);
  doc.text("Phone: +91 123 456 7890", 14, 68);

  // RIGHT SIDE
  doc.text(payment.studentName || "Student", 120, 50);
  doc.text("#8901 Address Line, City", 120, 56);
  doc.text(`Email: ${payment.studentEmail}`, 120, 62);
  doc.text("Phone: +91 098 765 4321", 120, 68);

  // ============================
  // PAYMENT TABLE
  // ============================

  const tableData = [
    ["1", "Course Fees", "One-Time", payment.orderId, new Date().toDateString(), `₹${payment.orderAmount}`],
  ];

  autoTable(doc, {
    startY: 80,
    head: [
      ["#", "FEES TYPE", "FREQUENCY", "INVOICE NO.", "DATE", "AMOUNT"]
    ],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: {
      fillColor: [245, 245, 245],
      textColor: 20,
      fontStyle: "bold"
    }
  });

  let finalY = (doc as any).lastAutoTable.finalY + 10;

  // ============================
  // TOTAL SECTION
  // ============================
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal:", 140, finalY);
  doc.text(`₹${payment.orderAmount}`, 180, finalY, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.text("Discount (0%):", 140, finalY + 8);
  doc.text(`₹0.00`, 180, finalY + 8, { align: "right" });

  doc.text("VAT (10%):", 140, finalY + 16);
  doc.text(`₹${(payment.orderAmount * 0.1).toFixed(2)}`, 180, finalY + 16, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 200);
  doc.text("Total Due:", 140, finalY + 30);
  doc.text(
    `₹${(payment.orderAmount * 1.1).toFixed(2)}`,
    180,
    finalY + 30,
    { align: "right" }
  );

  // Save file
  doc.save("Fees_Receipt.pdf");
};


  const statusColor =
    payment.orderStatus?.toLowerCase() === "paid"
      ? "green-600"
      : payment.orderStatus?.toLowerCase() === "pending"
      ? "yellow-600"
      : "red-600";

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center gap-4">
      {payment.orderStatus?.toLowerCase() === "paid" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <h1 className={`text-4xl font-bold text-${statusColor}`}>
        {payment.orderStatus === "paid"
          ? "Payment Successful 🎉"
          : payment.orderStatus === "pending"
          ? "Payment Pending ⏳"
          : "Payment Failed ❌"}
      </h1>
      <p className="text-gray-600 text-lg">Your enrollment status is updated.</p>

      <div className="mt-6 w-[380px] bg-white shadow-xl rounded-xl p-6 text-left space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <p>
          <strong>Order ID:</strong> {payment.orderId}
        </p>
        <p>
          <strong>Payment ID:</strong> {payment.paymentId || "N/A"}
        </p>
        <p>
          <strong>Amount:</strong> ₹{payment.orderAmount}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold text-${statusColor}`}>
            {payment.orderStatus}
          </span>
        </p>
        <p>
          <strong>Course:</strong> {payment.courseName}
        </p>
      </div>

      <Button
        onClick={generatePDF}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md"
      >
        Download Receipt (PDF)
      </Button>

      <Button
        variant="success"
        className="mt-4"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Go to Dashboard

      </Button>
    </div>
  );
}






























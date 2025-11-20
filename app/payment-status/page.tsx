

// "use client";

// import { useEffect, useState } from "react";
// import Confetti from "react-confetti";

// export default function PaymentStatusPage() {
//   const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const url = new URL(window.location.href);
//     const orderId = url.searchParams.get("order_id");

//     if (!orderId) {
//       setStatus("failed");
//       setMessage("Order ID missing.");
//       return;
//     }

//     async function checkStatus() {
//       try {
//         const res = await fetch(`/api/cashfree/check-status?orderId=${orderId}`);
//         const data = await res.json();

//         if (data.success) {
//           setStatus("success");
//           setMessage("Payment Successful! You are now enrolled.");
//         } else {
//           setStatus("failed");
//           setMessage("Payment Failed or Pending.");
//         }
//       } catch {
//         setStatus("failed");
//         setMessage("Something went wrong.");
//       }
//     }

//     checkStatus();
//   }, []);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#f7f9fc] to-[#e9f0ff] relative overflow-hidden">

//       {/* Confetti on success */}
//       {status === "success" && <Confetti numberOfPieces={200} gravity={0.2} />}

//       <div
//         className={`
//           w-[420px] p-10 rounded-3xl shadow-2xl backdrop-blur-lg
//           transition-all duration-500 border border-white/30
//           ${status === "success" ? "bg-white/40 animate-scaleIn" : ""}
//           ${status === "loading" ? "bg-white/30" : ""}
//           ${status === "failed" ? "bg-white/40 animate-shake" : ""}
//         `}
//       >
//         {/* Loading */}
//         {status === "loading" && (
//           <div className="flex flex-col items-center">
//             <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
//             <h2 className="text-xl font-semibold mt-4">Checking Payment...</h2>
//             <p className="text-gray-500 mt-2">Please wait</p>
//           </div>
//         )}

//         {/* Success */}
//         {status === "success" && (
//           <div className="text-center">
//             <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-12 h-12 text-primarh animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//               </svg>
//             </div>

//             <h2 className="text-3xl font-bold text-primary">Payment Successful 🎉</h2>
//             <p className="text-gray-700 mt-3">{message}</p>

//             <button
//               onClick={() => (window.location.href = "/dashboard")}
//               className="mt-6 px-6 py-3 rounded-xl bg-primary text-white shadow-lg hover:scale-105 transition-all"
//             >
//               Continue
//             </button>
//           </div>
//         )}

//         {/* Failed */}
//         {status === "failed" && (
//           <div className="text-center">
//             <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-12 h-12 text-red-600 animate-pop" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>

//             <h2 className="text-3xl font-bold text-red-600">Payment Failed ❌</h2>
//             <p className="text-gray-700 mt-3">{message}</p>

//             <button
//               onClick={() => (window.location.href = "/courses")}
//               className="mt-6 px-6 py-3 rounded-xl bg-red-600 text-white shadow-lg hover:scale-105 transition-all"
//             >
//               Try Again
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Animations */}
//       <style jsx global>{`
//         .animate-scaleIn {
//           animation: scaleIn 0.6s ease forwards;
//         }
//         @keyframes scaleIn {
//           0% { transform: scale(0.8); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }

//         .animate-pop {
//           animation: pop 0.5s ease forwards;
//         }
//         @keyframes pop {
//           0% { transform: scale(0.3); opacity: 0; }
//           100% { transform: scale(1); opacity: 1; }
//         }

//         .animate-shake {
//           animation: shake 0.4s ease-in-out;
//         }
//         @keyframes shake {
//           0%, 100% { transform: translateX(0); }
//           20% { transform: translateX(-6px); }
//           40% { transform: translateX(6px); }
//           60% { transform: translateX(-4px); }
//           80% { transform: translateX(4px); }
//         }
//       `}</style>
//     </div>
//   );
// }








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

  // Generate PDF receipt
  const generatePDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${payment.orderId}`, 20, 40);
    doc.text(`Payment ID: ${payment.paymentId || "N/A"}`, 20, 50);
    doc.text(`Name: ${payment.studentName}`, 20, 60);
    doc.text(`Email: ${payment.studentEmail}`, 20, 70);
    doc.text(`Course: ${payment.courseName}`, 20, 80);
    doc.text(`Amount Paid: ₹${payment.orderAmount}`, 20, 90);
    doc.text(`Payment Status: ${payment.orderStatus}`, 20, 100);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 110);

    doc.save("receipt.pdf");
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

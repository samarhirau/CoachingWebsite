import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  amount: { type: Number, required: true },

  status: { type: String, enum: ["pending", "success", "failed" ,"refunded"], default: "pending" },
  paidAt: { type: Date },
  enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enrollment" },
  transactionId: { type: String },  
orderId : { type: String, required: true, unique: true }, 
failureReason: { type: String },
failureDescription: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;



  // paymentMethod: { type: String, enum: ["card", "upi", "wallet"], default: "card" },
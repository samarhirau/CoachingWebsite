import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Start Live Chat with Counselor"
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  createdAt: { type: Date, default: Date.now },
});

const Action = mongoose.models.Action || mongoose.model("Action", ActionSchema);
export default Action;

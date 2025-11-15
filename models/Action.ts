import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  createdAt: { type: Date, default: Date.now },
  status: {
      type: String,
      enum: ["Pending", "Processing", "Processed"],
      default: "Pending",
    },
    processedAt: { type: Date },
});

const Action = mongoose.models.Action || mongoose.model("Action", ActionSchema);
export default Action;

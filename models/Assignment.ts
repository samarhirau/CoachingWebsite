import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  submissions: [
    {
      student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      file: { type: String },
      submittedAt: { type: Date, default: Date.now },
      marks: { type: Number },
      feedback: { type: String }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


const Assignment = mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

export default Assignment;




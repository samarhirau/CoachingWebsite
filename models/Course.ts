import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  duration: { type: String },
  price: { type: Number, default: 0 },
  originalPrice: { type: Number },
  rating: { type: Number, default: 0 },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  features: [{ type: String }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;

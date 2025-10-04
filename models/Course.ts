
import mongoose, { Schema, model, models } from "mongoose";

const TimelineSchema = new Schema({
  month: { type: String, required: true },
  focus: { type: String, required: true },
});

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    duration: { type: String },
    price: { type: Number },
    originalPrice: { type: Number },
    rating: { type: Number },
    professor: { type: String },
    maxStudents: { type: Number },
    contactNumber: { type: String },
    features: [{ type: String }],
    level: { type: String },
    color: { type: String },
    details: { type: String },
    roadmap: [{ type: String }],        // array of strings
    timeline: [TimelineSchema],         // array of objects
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);
export default Course;

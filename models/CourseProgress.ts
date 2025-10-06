import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema(
     {
           userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completedTopics: { type: [String], default: [] },
    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CourseProgress = mongoose.models.CourseProgress || mongoose.model("CourseProgress", CourseProgressSchema);

export default CourseProgress;
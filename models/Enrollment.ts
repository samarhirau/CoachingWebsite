import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    formData: {
      firstName: String,
      lastName: String,
      email: { type: String, required: true },
      phone: { type: String, required: true },
      education: String,
      experience: String,
      motivation: String,
      paymentPlan: String,
      agreeTerms: Boolean,
      couponCode: String,
    },
});

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
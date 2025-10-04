import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  email: { type: String, required: true, unique: true },
   phone : {type: String, 
    unique: true, 
    sparse: true 
  },
  
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  otp: { type: String },
  otpExpiry: { type: Date },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

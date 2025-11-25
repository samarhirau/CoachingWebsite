// // app/course/[slug]/page.tsx
// import { Dashboard } from '@/components/Dash';

// interface PageProps {
//   params: { slug: string };
// }

// export default function CoursePage({ params }: PageProps) {
//   return <Dashboard slug={params.slug} />;
// }

import mongoose from "mongoose";
import connectDB from "@/lib/mongoDb";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Dashboard } from "@/components/Dash";

interface PageProps {
  params: { slug: string };
}

export default async function CoursePage({ params }: PageProps) {
  await connectDB();

  const token = cookies().get("auth-token")?.value;
  if (!token) redirect("/login");

  let userId: string;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    userId = payload.userId || payload.id || payload._id;
  } catch {
    redirect("/login");
  }

  // 1. Fetch course by slug
  const course = await Course.findOne({ slug: params.slug });
  if (!course) redirect("/dashboard"); // course doesn't exist

  // 2. Check if user is enrolled
  const enrollment = await Enrollment.findOne({
    studentId: userId,
    courseId: new mongoose.Types.ObjectId(course._id),
  });

  if (!enrollment) redirect("/dashboard"); // not enrolled

  // 3. Only enrolled users reach here
  return <Dashboard slug={params.slug} />;
}

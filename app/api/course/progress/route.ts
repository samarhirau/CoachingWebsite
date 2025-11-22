export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;




import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoDb";
import CourseProgress, { ICourseProgress } from "@/models/CourseProgress";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { userId, courseId, completedTopics, progress } = await req.json();

    if (!userId || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing: ICourseProgress | null = await CourseProgress.findOne({ userId, courseId });

    if (existing) {
      existing.completedTopics = completedTopics;
      existing.progress = progress;
      await existing.save();
    } else {
      await CourseProgress.create({ userId, courseId, completedTopics, progress });
    }

    return NextResponse.json({ success: true, message: "Progress saved" });
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const courseId = url.searchParams.get("courseId");

    if (!userId || !courseId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const progress = await CourseProgress.findOne({ userId, courseId });

    return NextResponse.json(progress || { completedTopics: [], progress: 0 });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

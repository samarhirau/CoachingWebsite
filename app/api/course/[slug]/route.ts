import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDb"
import Course from "@/models/Course"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  await connectDB()
  const { slug } = params

  const course = await Course.findOne({ slug }).lean()
  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(course)
}

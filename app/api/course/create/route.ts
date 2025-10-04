import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDb"
import Course from "@/models/Course"

export async function POST(request: Request) {
  await connectDB()
  try {
    const body = await request.json()

    // Ensure slug is unique
    const existing = await Course.findOne({ slug: body.slug })
    if (existing) {
      return NextResponse.json({ error: "Course with this slug already exists" }, { status: 400 })
    }

    const course = await Course.create(body)
return NextResponse.json(course, { status: 201 },)
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message || "Failed to create course" }, { status: 500 })
  }
}

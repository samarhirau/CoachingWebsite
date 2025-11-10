
// import { NextResponse } from "next/server"
// import connectDB from "@/lib/mongoDb"
// import User from "@/models/User"
// import { getServerSession } from "@/lib/auth"

// export const dynamic = "force-dynamic"

// export async function GET() {
//   try {
//     const session = await getServerSession()

//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     await connectDB()
//     const user = await User.findById(session.userId).select("-password")

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     return NextResponse.json({ user })
//   } catch (error) {
//     console.error("Auth check error:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
import { NextResponse } from "next/server"
import { getServerSession } from "@/lib/auth"
import connectDB from "@/lib/mongoDb" // Mongoose Connection Utility
import User from "@/models/User" // Mongoose User Model

// Ensures this route is not cached, guaranteeing a real-time session check
export const dynamic = "force-dynamic" 

export async function GET() {
  try {
    // 1. Read and verify the httpOnly cookie on the server
    const session = await getServerSession()

    // 2. UNAUTHORIZED CHECK
    if (!session) {
      // Returns a 401 status if the cookie is missing or invalid/expired
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // 3. DATABASE LOOKUP
    await connectDB() // Establish connection to MongoDB
    
    // Find user by ID, exclude the password hash, and convert the Mongoose document to a plain JS object (.lean())
    const user = await User.findById(session.userId).select("-password").lean() 

    if (!user) {
      // If the token is valid but the user record doesn't exist (deleted user)
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // 4. Return authenticated user data (safe because password was excluded)
    return NextResponse.json({ user })
    
  } catch (error) {
    console.error("Auth check error:", error)
    // Generic 500 for unhandled server/database errors
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

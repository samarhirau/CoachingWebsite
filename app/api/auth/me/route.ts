
// import { NextResponse } from "next/server"
// import { getServerSession } from "@/lib/auth"
// import connectDB from "@/lib/mongoDb" // Mongoose Connection Utility
// import User from "@/models/User" // Mongoose User Model

// // Ensures this route is not cached, guaranteeing a real-time session check
// export const dynamic = "force-dynamic" 

// export async function GET() {
//   try {
//     // 1. Read and verify the httpOnly cookie on the server
//     const session = await getServerSession()

//     // 2. UNAUTHORIZED CHECK
//     if (!session) {
//       // Returns a 401 status if the cookie is missing or invalid/expired
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     // 3. DATABASE LOOKUP
//     await connectDB() // Establish connection to MongoDB
    
//     // Find user by ID, exclude the password hash, and convert the Mongoose document to a plain JS object (.lean())
//     const user = await User.findById(session.userId).select("-password").lean() 

//     if (!user) {
//       // If the token is valid but the user record doesn't exist (deleted user)
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     // 4. Return authenticated user data (safe because password was excluded)
//     return NextResponse.json({ user })
    
//   } catch (error) {
//     console.error("Auth check error:", error)
//     // Generic 500 for unhandled server/database errors
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export const dynamic = "force-dynamic"
// export const revalidate = 0 // Ensure no caching at all
// import { NextResponse } from "next/server"
// import { getServerSession } from "@/lib/auth"
// import connectDB from "@/lib/mongoDb"
// import User from "@/models/User"



// export async function GET() {
//   try {
//     // 1. Auth Verification (reads httpOnly cookie)
//     const session = await getServerSession()

//     if (!session) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       )
//     }

//     // 2. DB (no re-connect if already cached)
//     await connectDB()

//     // 3. Fetch user
//     const user = await User.findById(session.userId)
//       .select("-password")
//       .lean()

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found" },
//         { status: 404 }
//       )
//     }

//     // 4. SUCCESS RESPONSE
//     return NextResponse.json(
//       {
//         success: true,
//         user,
//       },
//       {
//         status: 200,
//         headers: {
//           "Cache-Control": "no-store", // ensures client never caches
//         },
//       }
//     )

//   } catch (err) {
//     console.error("GET /api/auth/me error:", err)

//     return NextResponse.json(
//       { success: false, message: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }














export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  try {
    // 1. Read token from httpOnly cookie (auth-token)
    const cookie = req.headers.get("cookie") || ""
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("auth-token="))
      ?.split("=")[1]

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // 2. Verify JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    // 3. Connect DB
    await connectDB()

    // 4. Fetch user
    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean()

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    // 5. Success
    return NextResponse.json(
      { success: true, user },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    )
  } catch (err) {
    console.error("GET /api/auth/me error:", err)
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 401 }
    )
  }
}

import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongoDb"
import User from "@/models/User"
import { hashPassword, generateToken } from "@/lib/auth"
// import { sendWelcomeEmail } from "@/lib/services/sendmailtrap"  // chnaged here

export async function POST(request: NextRequest) {
  try {
    const { email, password, name , phone } = await request.json()

    if (!email || !password || !name ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    const adminKey = process.env.ADMIN_KEY 
    let userRole: "admin" | "student" = "student"
    if (request.headers.get("x-admin-key") === adminKey) {
  
      userRole = "admin"
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

 const userData: {
  email: string;
  password: string;
  name: string;
  role: "admin" | "student";
  phone?: string;
} = {
  email,
  password: hashedPassword,
  name,
  role: userRole,
};

if (phone && phone.trim() !== "") {
  userData.phone = phone.trim();
}

const user = await User.create(userData);


 // Send welcome email
    // await sendWelcomeEmail(email, name).catch((err) => {
    //   console.error("Error sending welcome email:", err)
    //   throw new Error("Failed to send welcome email");
    // })



    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    // Set HTTP-only cookie
    const response = NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      message: "User created successfully",
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

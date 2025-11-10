// import { NextResponse } from "next/server"

// export async function POST() {
//   const response = NextResponse.json({ message: "Logged out successfully" })

//   response.cookies.delete("auth-token")

//   return response
// }
import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" })
  await clearAuthCookie()
  return res
}

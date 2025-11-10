

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

// NOTE: In a real app, this should be read from process.env
const JWT_SECRET = process.env.JWT_SECRET! 

export interface JWTPayload {
  userId: string
  email: string
  role: "admin" | "student"
}

/**
 * Generates a signed JWT token.
 * @param payload - The user data to encode.
 */
export function generateToken(payload: JWTPayload): string {
  // Token expires in 7 days
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param token - The raw JWT string.
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    // Token is invalid, expired, or malformed
    return null
  }
}
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

/**
 * Reads the 'auth-token' cookie on the server and verifies the session.
 */
export async function getServerSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  return verifyToken(token)
}

/**
 * Sets the secure, httpOnly cookie on the server response.
 * @param token - The JWT to store.
 */
export async function setAuthCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set({
    name: 'auth-token',
    value: token,
    httpOnly: true, // Prevents client-side JS from reading it
    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    sameSite: 'lax', // Correct for single-site apps, 'none' for cross-domain
    path: '/', 
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

/**
 * Clears the authentication cookie.
 */
export async function clearAuthCookie() {
  const cookieStore = cookies()
  cookieStore.delete("auth-token")
}
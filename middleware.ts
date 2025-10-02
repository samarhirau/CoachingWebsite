import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && (!token || role !== "admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!token) return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};

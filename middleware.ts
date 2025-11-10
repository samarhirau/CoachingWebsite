// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// export const dynamic = 'force-dynamic';



// export const runtime = 'nodejs'

// import { jwtVerify } from 'jose'

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('auth-token')?.value
//   const { pathname } = request.nextUrl

//   if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   if (token && pathname.startsWith('/admin')) {
//     try {
//       const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
//       const { payload } = await jwtVerify(token, secret)
//       if (payload.role !== 'admin') {
//         return NextResponse.redirect(new URL('/', request.url))
//       }
//     } catch (err) {
//       return NextResponse.redirect(new URL('/', request.url))
//     }
//   }

//   return NextResponse.next()
// }
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

export const runtime = 'experimental-edge'


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  const { pathname } = req.nextUrl

  // Protect dashboard/admin routes
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Admin check
  if (token && pathname.startsWith("/admin")) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
      const { payload } = await jwtVerify(token, secret)
      if (payload.role !== "admin") return NextResponse.redirect(new URL("/", req.url))
    } catch {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}

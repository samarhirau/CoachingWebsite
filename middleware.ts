// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   // console.log('🧪 Middleware is running...')

//   const token = request.cookies.get('auth-token')?.value
//   // console.log('🔐 Token from cookie:', token)

//   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// }
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // Not logged in
    if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role?: string }

    // Admin check
    if (request.nextUrl.pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Dashboard check (optional)
    // if (request.nextUrl.pathname.startsWith('/dashboard') && !decoded.role) { ... }

  } catch (err) {
    // Invalid token
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

import { ToastProvider } from "@/components/toastProvider"
import { AuthProvider } from "@/components/auth-provider"

export const metadata: Metadata = {
  title: "RidBharat - Your Trusted Partner in India",
  description:
    "Professional services and solutions tailored for the Indian market. Experience excellence with RidBharat.",
  generator: "RidBharat.com",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
       
          <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  )
}



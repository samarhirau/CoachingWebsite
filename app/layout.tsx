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

  title: "RID Bharat | Research Innovation and Discovery Organization",
  description:
    "RID Bharat is a national organization driving innovation, technology, and research to empower India’s youth. Join us in shaping the future through projects, hackathons, and community-driven discoveries.",
  keywords: [
    "RID Bharat",
    "Research Innovation and Discovery",
    "Innovation India",
    "RID Organization",
    "Tech Community India",
    "Student Innovation",
    "Hackathon India",
    "Research Projects",
    "RID Foundation",
    "RID Students",
  ],
  authors: [{ name: "RID Bharat" }],
  openGraph: {
    title: "RID Bharat | Research Innovation and Discovery Organization",
    description:
      "Empowering Indian youth through research, innovation, and technology. Join RID Bharat and be part of the nation’s innovation movement.",
    url: "https://ridbharat.com",
    siteName: "RID Bharat",
    images: [
      {
        url: "https://ridbharat.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RID Bharat - Research Innovation and Discovery",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RID Bharat | Research Innovation and Discovery Organization",
    description:
      "Join RID Bharat to innovate, discover, and create impact through technology, research, and community collaboration.",
    images: ["https://ridbharat.com/og-image.png"],  // replace with your image
    creator: "@samar_hirau",
  },
  metadataBase: new URL("https://ridbharat.com"),
  alternates: {
    canonical: "https://ridbharat.com",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>)


{
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



import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"
import { ToastProvider } from "@/components/toastProvider"
import { AuthProvider } from "@/components/auth-provider"
import SpeedInsightsClient from "@/components/speed-insights"




export const metadata: Metadata = {

  metadataBase: new URL("https://upcoderv1.vercel.app"),

  title: "Upcoder | Learn, Build & Launch",
  description:
    "Upcoder empowers developers, students, and innovators through real projects, mentorship, and community-driven learning.",
  keywords: [
    "Upcoder",
    "coding projects",
    "developer community",
    "learn to code",
    "web development",
    "tech students",
    "innovation",
  ],

  authors: [{ name: "SAMAR HIRAU", url: "https://samarhirau.dev",
   }],

  alternates: {
    canonical: "https://upcoderv1.vercel.app",
  },

  openGraph: {
    title: "Upcoder | Learn, Build & Launch",
    description:
      "Join Upcoder to learn by building real projects, get mentorship, and launch your ideas.",
    url: "https://upcoderv1.vercel.app",
    siteName: "Upcoder",
    images: [
      {
        url: "https://upcoderv1.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Upcoder OpenGraph Image",
      },
    ],
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Upcoder | Learn, Build & Launch",
    description: "Build real projects. Join a powerful community. Become an Upcoder.",
    creator: "@samar_hirau",
    images: ["https://upcoderv1.vercel.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
};


export const viewport = {
  themeColor: "#ffffff",
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
           <SpeedInsightsClient />
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  )
}



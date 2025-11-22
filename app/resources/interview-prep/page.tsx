
"use client";

import Link from "next/link";
import { ModernNavigation } from "@/components/modern-navigation"; // Assumed Component
import { Footer } from "@/components/footer"; // Assumed Component
import {
  Download,
  Clipboard,
  Trophy,
  Activity,
  ArrowRight,
  Code,
  Users,
  MessageSquare,
  DollarSign,
  Monitor,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA FOR FREE DOWNLOADS ---
const freeResources = [
  {
    title: "Top 50 DSA Interview Questions PDF",
    description: "A comprehensive guide covering must-know Data Structures and Algorithms problems with solutions (in Python & JavaScript).",
    size: "1.5 MB",
    action: "Download Guide",
    link: "#",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    title: "The Ultimate Resume Template Pack",
    description: "Download 3 professionally designed, ATS-friendly resume templates optimized for tech roles (Word & Figma formats).",
    size: "800 KB",
    action: "Download Templates",
    link: "#",
    icon: <Clipboard className="h-6 w-6 text-primary" />,
  },
  {
    title: "Frontend System Design Cheatsheet",
    description: "Quick reference for designing scalable systems like Newsfeed, YouTube, and Chat apps (PDF).",
    size: "1.2 MB",
    action: "Download Cheatsheet",
    link: "#",
    icon: <Monitor className="h-6 w-6 text-primary" />,
  },
];

// --- FEATURED PAID RESOURCE (from your screenshot) ---
const featuredPaidCourse = {
  title: "Placement Material Kit",
  price: "₹49",
  oldPrice: "₹499",
  save: "₹450",
  link: "/courses/placement-material",
  level: "Beginner to Advanced",
  icon: <Trophy className="h-6 w-6 text-yellow-500" />,
  description: "Get access to complete placement preparation materials including aptitude, reasoning, and HR interview resources.",
  focus: "Aptitude, HR Prep, Resume Guidance",
};


// --- MAIN PAGE COMPONENT ---
export default function InterviewPrepResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <main className="flex-grow">
        
        {/* Hero Section: Resource Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="default" className="mb-4 bg-yellow-500 hover:bg-yellow-600">
              Free Resources
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Interview Preparation Toolkit
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Download free study guides, resume templates, and cheatsheets designed by industry experts to fast-track your job search.
            </p>
            <Link href="/paths/interview-prep">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 shadow-md hover:shadow-lg transition-shadow">
                    See Full Interview Path <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>
          </div>
        </section>

        {/* Free Downloads Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Essential Free Downloads
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Start building your knowledge base with zero cost.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {freeResources.map((resource, index) => (
                <Card 
                  key={index} 
                  className="group hover:border-yellow-500 transition-colors duration-300"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                        {resource.icon}
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription>{resource.description}</CardDescription>
                    <div className="flex justify-between items-center pt-2">
                        <Badge variant="secondary" className="text-sm">{resource.size}</Badge>
                        <Link href={resource.link}>
                            <Button size="sm" className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700">
                                <Download className="h-4 w-4" /> {resource.action}
                            </Button>
                        </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Paid Feature CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
                    Upgrade Your Prep: The Full Kit
                </h2>
                <p className="text-xl text-muted-foreground text-center mb-10">
                    For a one-time low price, get comprehensive materials designed for placement tests.
                </p>

                <Card className="flex flex-col md:flex-row items-center p-6 md:p-8 border-4 border-yellow-500 shadow-xl">
                    <div className="md:w-3/4 space-y-3 md:text-left text-center">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            {featuredPaidCourse.icon}
                            <h3 className="text-2xl font-bold">{featuredPaidCourse.title}</h3>
                            <Badge variant="outline">{featuredPaidCourse.level}</Badge>
                        </div>
                        <p className="text-muted-foreground">{featuredPaidCourse.description}</p>
                        <ul className="list-disc ml-6 text-sm text-gray-600 dark:text-gray-400">
                            <li>Includes Aptitude & Reasoning notes</li>
                            <li>HR & Technical interview questions</li>
                            <li>Company-wise preparation PDFs</li>
                        </ul>
                    </div>
                    <div className="md:w-1/4 flex flex-col items-center md:items-end space-y-2 mt-6 md:mt-0">
                        <p className="text-4xl font-extrabold text-primary">{featuredPaidCourse.price}</p>
                        <p className="text-base line-through text-muted-foreground">{featuredPaidCourse.oldPrice}</p>
                        <Link href={featuredPaidCourse.link}>
                            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 w-full md:w-auto">
                                Enroll Now
                            </Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </section>

        {/* Final CTA to Full Path */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-yellow-100 dark:bg-yellow-900/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Guaranteed Success?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    Our full career path gives you access to mentorship, live classes, and guaranteed interview readiness.
                </p>
                <Link href="/paths/interview-prep">
                    <Button size="xl" className="text-lg px-10 py-3 shadow-xl bg-yellow-600 hover:bg-yellow-700 text-white">
                        See Full Interview Path Curriculum
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
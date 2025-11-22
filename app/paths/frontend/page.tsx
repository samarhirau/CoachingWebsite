
"use client";

import Link from "next/link";
import { ModernNavigation } from "@/components/modern-navigation"; // Assumed Component
import { Footer } from "@/components/footer"; // Assumed Component
import {
  Shield,
  Code,
  Layers,
  Zap,
  Star,
  BookOpen,
  ArrowRight,
  Gauge,
  Hourglass,
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

// --- MOCK DATA FOR THE FRONTEND PATH ---
const pathSummary = [
  {
    icon: <Gauge className="h-6 w-6 text-primary" />,
    title: "Project-Based Learning",
    description: "Build 5+ real-world projects, including a full e-commerce storefront, portfolio site, and dynamic data visualization app.",
  },
  {
    icon: <Hourglass className="h-6 w-6 text-primary" />,
    title: "Duration: 6 Months",
    description: "Designed for a fast-track career shift, focusing only on in-demand tools and interview preparation.",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "Affordable Access",
    description: "Start your journey with low-cost workshops (like ₹49 UI/UX) and enroll in full courses for maximum value.",
  },
];

const roadmapSteps = [
  {
    title: "Phase 1: Foundations",
    skills: ["HTML5 Structure", "Modern CSS (Flexbox, Grid)", "Responsive Design"],
    course: "Web Development Fundamentals",
  },
  {
    title: "Phase 2: JavaScript Core",
    skills: ["ES6+ Syntax", "DOM Manipulation", "Async/Await", "API Integration (Fetch)"],
    course: "JavaScript Mastery (The Complete Guide)",
  },
  {
    title: "Phase 3: Framework Specialization",
    skills: ["React/Next.js Fundamentals", "State Management (Hooks)", "Component Architecture"],
    course: "ReactJS for Modern Web Apps",
  },
  {
    title: "Phase 4: Optimization & Interview Prep",
    skills: ["Performance Optimization", "Advanced Design Patterns", "Frontend System Design"],
    course: "Complete Frontend Interview Kit", // Matches your screenshot course!
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "Complete Frontend Interview Kit",
    price: "₹79",
    oldPrice: "₹699",
    save: "₹620",
    link: "/courses/frontend-interview-kit",
    level: "Advanced",
    icon: <Layers className="h-5 w-5 text-blue-500" />,
    description: "A comprehensive course to prepare for frontend interviews covering HTML, CSS, JavaScript, React, and frontend system design.",
    focus: "Interview Prep, System Design",
  },
  {
    id: 2,
    title: "3-Day UI/UX Workshop",
    price: "₹49",
    oldPrice: "₹199",
    save: "₹150",
    link: "/courses/ui-ux-workshop",
    level: "Beginner",
    icon: <Monitor className="h-5 w-5 text-green-500" />,
    description: "A fast-track, hands-on workshop to learn the essentials of UI/UX design in just 3 days using Figma/Adobe XD.",
    focus: "Design Fundamentals, Prototyping",
  },
];

// --- MAIN PAGE COMPONENT ---
export default function FrontendPathPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <main className="flex-grow">
        
        {/* Hero Section: Path Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="default" className="mb-4 bg-indigo-500 hover:bg-indigo-600">
              Career Path
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Master the Frontend Stack
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              From responsive HTML/CSS to advanced React development, this path provides the complete skillset needed to land a job as a professional Frontend Engineer.
            </p>
            <Button size="xl" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow">
              View Full Curriculum (12 Courses) <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathSummary.map((item, index) => (
              <Card key={index} className="p-4 text-center border-2 border-indigo-200 dark:border-indigo-800">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mx-auto">
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Courses Section: Featured Offerings (Matching Screenshots) */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Featured Courses on this Path
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Start with a low-cost entry or dive straight into interview preparation.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader className="flex flex-row items-start justify-between p-6 bg-indigo-50 dark:bg-indigo-900/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {course.icon}
                        <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                          {course.title}
                        </CardTitle>
                      </div>
                      <CardDescription>Focus: {course.focus}</CardDescription>
                      <Badge variant="outline" className="text-xs bg-white dark:bg-gray-800">{course.level}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold text-primary">{course.price}</p>
                      <p className="text-sm line-through text-muted-foreground">{course.oldPrice}</p>
                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Save {course.save}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-base text-gray-700 dark:text-gray-300">{course.description}</p>
                    <Link href={course.link}>
                      <Button className="w-full mt-4">
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              The Frontend Mastery Roadmap
            </h2>

            <div className="relative space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="flex relative">
                  {/* Vertical Line Connector (Hidden on last item) */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="absolute left-3 top-10 bottom-0 w-1 bg-indigo-200 dark:bg-indigo-700"></div>
                  )}

                  {/* Dot/Icon */}
                  <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-black">
                    <Code className="h-3 w-3 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 ml-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      Recommended Course: <span className="text-primary">{step.course}</span>
                    </p>
                    <ul className="list-disc ml-5 text-sm space-y-1 text-muted-foreground">
                      {step.skills.map((skill, sIndex) => (
                        <li key={sIndex}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/10 dark:bg-primary/20">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Career?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    Enroll in the full Frontend Path today and get instant access to 12 specialized courses, a dedicated support community, and professional mentorship.
                </p>
                <Link href="/courses?path=frontend">
                    <Button size="xl" className="text-lg px-10 py-3 shadow-xl bg-indigo-600 hover:bg-indigo-700">
                        Enroll in Frontend Path Now
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
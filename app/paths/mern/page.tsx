"use client";

import Link from "next/link";
import { ModernNavigation } from "@/components/modern-navigation"; // Assumed Component
import { Footer } from "@/components/footer"; // Assumed Component
import {
  Server,
  Code,
  Database,
  ArrowRight,
  Shield,
  BookOpen,
  Gauge,
  Hourglass,
  DollarSign,
  Zap,
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

// --- MOCK DATA FOR THE MERN STACK PATH ---
const pathSummary = [
  {
    icon: <Database className="h-6 w-6 text-primary" />,
    title: "Full-Stack Development",
    description: "Master all four pillars: MongoDB (Database), Express (Backend), React (Frontend), and Node.js (Server Runtime).",
  },
  {
    icon: <Hourglass className="h-6 w-6 text-primary" />,
    title: "Duration: 8 Months",
    description: "Comprehensive curriculum designed for deep understanding, culminating in 6 major full-stack capstone projects.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Job-Ready Security",
    description: "Learn essential security practices including JWT authentication, data validation, and preventing common vulnerabilities.",
  },
];

const roadmapSteps = [
  {
    title: "Phase 1: React & Frontend Deep Dive",
    skills: ["React Hooks & Context API", "Routing (React Router)", "Component Lifecycle", "State Management (Redux/Zustand)"],
    course: "ReactJS for Modern Web Apps",
  },
  {
    title: "Phase 2: Node.js & Server Runtime",
    skills: ["Node.js Core Concepts", "NPM & Project Setup", "Asynchronous Programming", "Middleware and Request Handling"],
    course: "Node.js Essentials for Backend",
  },
  {
    title: "Phase 3: Express & API Construction",
    skills: ["Building RESTful APIs", "Error Handling & Logging", "Middleware Chains", "Deployment Basics"],
    course: "Express.js: Building Scalable APIs",
  },
  {
    title: "Phase 4: MongoDB & Database",
    skills: ["NoSQL Fundamentals", "CRUD Operations with Mongoose", "Data Modeling & Schema Design", "Advanced Queries"],
    course: "MongoDB for Full-Stack Developers",
  },
  {
    title: "Phase 5: Final Projects & Interview Prep",
    skills: ["Authentication systems", "Deployment (Vercel/Render)", "Full-Stack System Design"],
    course: "MERN Stack Interview Mastery", // Matches your screenshot course!
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "MERN Stack Interview Mastery",
    price: "₹99",
    oldPrice: "₹899",
    save: "₹800",
    link: "/courses/mern-interview-mastery",
    level: "Advanced",
    icon: <Server className="h-5 w-5 text-red-500" />,
    description: "Master full-stack development and crack MERN (MongoDB, Express, React, Node.js) interviews with hands-on projects, coding challenges, and mock interviews.",
    focus: "Interview Prep, Full-Stack Projects",
  },
  {
    id: 2,
    title: "Complete MERN Stack Bootcamp",
    price: "₹5999",
    oldPrice: "₹19999",
    save: "₹14000",
    link: "/courses/mern-bootcamp",
    level: "All Levels",
    icon: <Code className="h-5 w-5 text-blue-500" />,
    description: "The complete A-to-Z path covering all technologies from basic JavaScript to complex full-stack deployment and portfolio building.",
    focus: "Comprehensive, Certification",
  },
];

// --- MAIN PAGE COMPONENT ---
export default function MERNPathPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <main className="flex-grow">
        
        {/* Hero Section: Path Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="default" className="mb-4 bg-red-600 hover:bg-red-700">
              Career Path
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              MERN Stack Mastery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Become a certified Full-Stack Developer. Build modern, scalable web applications using MongoDB, Express.js, React, and Node.js.
            </p>
            <Button size="xl" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow bg-red-600 hover:bg-red-700">
              View Full Curriculum (18 Courses) <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathSummary.map((item, index) => (
              <Card key={index} className="p-4 text-center border-2 border-red-200 dark:border-red-800">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mx-auto">
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

        {/* Courses Section: Featured Offerings */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Essential MERN Stack Courses
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Start with our popular interview kit or enroll in the complete path for certification.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader className="flex flex-row items-start justify-between p-6 bg-red-50 dark:bg-red-900/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {course.icon}
                        <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-300">
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
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">
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
              The MERN Full-Stack Roadmap
            </h2>

            <div className="relative space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="flex relative">
                  {/* Vertical Line Connector (Hidden on last item) */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="absolute left-3 top-10 bottom-0 w-1 bg-red-200 dark:bg-red-700"></div>
                  )}

                  {/* Dot/Icon */}
                  <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-red-500 ring-4 ring-white dark:ring-black">
                    <Database className="h-3 w-3 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 ml-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-2">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-100 dark:bg-red-900/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready for Full-Stack Mastery?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    Enroll in the full MERN Path today and gain the skills to build and deploy any application from scratch.
                </p>
                <Link href="/courses?path=mern">
                    <Button size="xl" className="text-lg px-10 py-3 shadow-xl bg-red-600 hover:bg-red-700">
                        Enroll in MERN Path Now
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
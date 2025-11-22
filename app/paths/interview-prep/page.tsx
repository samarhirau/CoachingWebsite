"use client";

import Link from "next/link";
import { ModernNavigation } from "@/components/modern-navigation"; // Assumed Component
import { Footer } from "@/components/footer"; // Assumed Component
import {
  Code,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Shield,
  Activity,
  DollarSign,
  Clipboard,
  Trophy,
  MessageSquare,
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

// --- MOCK DATA FOR THE INTERVIEW PREP PATH ---
const pathSummary = [
  {
    icon: <Clipboard className="h-6 w-6 text-yellow-600" />,
    title: "100% Technical Readiness",
    description: "Focus on Data Structures, Algorithms, and System Design needed to clear the hardest technical screening rounds.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-yellow-600" />,
    title: "Behavioral & HR Prep",
    description: "Master soft skills, communication, and confidence needed for behavioral interviews and HR discussions.",
  },
  {
    icon: <Users className="h-6 w-6 text-yellow-600" />,
    title: "Dedicated Mock Interviews",
    description: "Get personalized feedback through recorded and live mock interviews conducted by industry experts.",
  },
];

const roadmapSteps = [
  {
    title: "Phase 1: Foundation & Aptitude",
    skills: ["Quantitative Aptitude Review", "Logical & Verbal Reasoning", "Core CS Fundamentals (OS, Networking, DBMS)"],
    course: "Placement Material & Aptitude Kit",
  },
  {
    title: "Phase 2: Coding Interview Mastery",
    skills: ["Data Structures (Arrays, Trees, Graphs)", "Algorithm Optimization (Time/Space Complexity)", "Dynamic Programming Basics"],
    course: "DSA for Interviews (Advanced)",
  },
  {
    title: "Phase 3: System Design & Projects",
    skills: ["Low-Level Design (OOD)", "High-Level Design (Scalability, Databases, Microservices)", "Project Walkthroughs"],
    course: "Complete Frontend/MERN Interview Kit",
  },
  {
    title: "Phase 4: Final Polish & Placement",
    skills: ["Resume & Portfolio Guidance", "HR Questions & Negotiation Tactics", "Company-Specific Interview Questions"],
    course: "Job Ready Capstone Program",
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "Placement Material",
    price: "₹49",
    oldPrice: "₹499",
    save: "₹450",
    link: "/courses/placement-material",
    level: "Beginner to Advanced",
    icon: <Clipboard className="h-5 w-5 text-yellow-500" />,
    description: "Get access to complete placement preparation materials including aptitude, reasoning, and interview resources. Great for initial screening tests.",
    focus: "Aptitude, HR Prep, Resume Guidance",
    color: "bg-yellow-50",
    colorDark: "dark:bg-yellow-900/30",
  },
  {
    id: 2,
    title: "Complete Frontend Interview Kit",
    price: "₹79",
    oldPrice: "₹699",
    save: "₹620",
    link: "/courses/frontend-interview-kit",
    level: "Advanced",
    icon: <Code className="h-5 w-5 text-yellow-700" />,
    description: "A comprehensive course to prepare for frontend interviews covering HTML, CSS, JavaScript, React, and frontend system design.",
    focus: "Technical Coding, System Design",
    color: "bg-amber-50",
    colorDark: "dark:bg-amber-900/30",
  },
];

// --- MAIN PAGE COMPONENT ---
export default function InterviewPrepPathPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <main className="flex-grow">
        
        {/* Hero Section: Path Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="default" className="mb-4 bg-yellow-500 hover:bg-yellow-600">
              Career Path
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Job Readiness & Interview Prep
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Transform into a top-tier candidate. Master the technical, behavioral, and communication skills required to crack interviews at leading tech companies.
            </p>
            <Button size="xl" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow bg-yellow-600 hover:bg-yellow-700 text-white">
              Start Your Interview Prep <Trophy className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathSummary.map((item, index) => (
              <Card key={index} className="p-4 text-center border-2 border-yellow-200 dark:border-yellow-800">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 mx-auto">
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
              Interview Essentials & Kits
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Access the most essential materials designed for rapid placement readiness.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCourses.map((course) => (
                <Card 
                  key={course.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardHeader className={`flex flex-row items-start justify-between p-6 ${course.color} ${course.colorDark}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {course.icon}
                        <CardTitle className="text-2xl font-bold text-gray-700 dark:text-gray-300">
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
                      <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700">
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
              The 4-Step Interview Success Roadmap
            </h2>

            <div className="relative space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="flex relative">
                  {/* Vertical Line Connector (Hidden on last item) */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="absolute left-3 top-10 bottom-0 w-1 bg-yellow-200 dark:bg-yellow-700"></div>
                  )}

                  {/* Dot/Icon */}
                  <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 ring-4 ring-white dark:ring-black">
                    <Activity className="h-3 w-3 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 ml-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-300 mb-2">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-yellow-100 dark:bg-yellow-900/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Don't Just Apply, Get Hired.</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    Enroll in the Interview Prep Path for the highest chance of landing your dream tech role.
                </p>
                <Link href="/courses?path=interview-prep">
                    <Button size="xl" className="text-lg px-10 py-3 shadow-xl bg-yellow-600 hover:bg-yellow-700 text-white">
                        Enroll in Interview Prep Now
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}


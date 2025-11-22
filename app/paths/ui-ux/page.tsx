"use client";

import Link from "next/link";
import { ModernNavigation } from "@/components/modern-navigation"; // Assumed Component
import { Footer } from "@/components/footer"; // Assumed Component
import {
  Monitor,
  Layout,
  Layers,
  Users,
  Feather,
  BookOpen,
  ArrowRight,
  Target,
  Palette,
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

// --- MOCK DATA FOR THE UI/UX PATH ---
const pathSummary = [
  {
    icon: <Palette className="h-6 w-6 text-cyan-500" />,
    title: "Aesthetic & Usability Focus",
    description: "Learn how to balance visual appeal (UI) with functional effectiveness and ease of use (UX) for any digital product.",
  },
  {
    icon: <Layout className="h-6 w-6 text-cyan-500" />,
    title: "Tool Mastery: Figma",
    description: "Deep dive into the industry-standard design tool, Figma, covering everything from wireframing to advanced prototyping.",
  },
  {
    icon: <Users className="h-6 w-6 text-cyan-500" />,
    title: "User-Centric Design",
    description: "Master user research, persona creation, user journey mapping, and usability testing to build intuitive products.",
  },
];

const roadmapSteps = [
  {
    title: "Phase 1: UX Fundamentals & Research",
    skills: ["Design Thinking Principles", "User Research & Interviews", "Creating User Personas", "Information Architecture"],
    course: "User Experience Design Essentials",
  },
  {
    title: "Phase 2: Wireframing and Prototyping",
    skills: ["Low-fidelity Wireframing", "Figma/Adobe XD Mastery", "Interactive Prototyping", "Designing for Mobile First"],
    course: "Figma Prototyping Workshop",
  },
  {
    title: "Phase 3: Visual Design (UI)",
    skills: ["Color Theory & Typography", "Design Systems & Component Libraries", "Creating High-fidelity Mockups", "Accessibility Standards"],
    course: "Advanced UI Design & Style Guides",
  },
  {
    title: "Phase 4: Handoff & Portfolio",
    skills: ["Developer Handoff Techniques", "Usability Testing & Iteration", "Building a Professional Portfolio"],
    course: "Design Portfolio & Interview Kit",
  },
];

const featuredCourses = [
  {
    id: 1,
    title: "3-Day UI/UX Workshop",
    price: "₹49",
    oldPrice: "₹199",
    save: "₹150",
    link: "/courses/ui-ux-workshop",
    level: "Beginner",
    icon: <Feather className="h-5 w-5 text-purple-500" />,
    description: "A fast-track, hands-on introduction to the essentials of UI/UX design in just 3 days using Figma/Adobe XD.",
    focus: "Design Fundamentals, Prototyping",
    color: "bg-purple-50",
    colorDark: "dark:bg-purple-900/30",
  },
  {
    id: 2,
    title: "Complete Product Designer Bootcamp",
    price: "₹4999",
    oldPrice: "₹17999",
    save: "₹13000",
    link: "/courses/product-designer-bootcamp",
    level: "All Levels",
    icon: <Target className="h-5 w-5 text-cyan-500" />,
    description: "Go from zero design experience to job-ready Product Designer, including a full portfolio build and interview coaching.",
    focus: "Comprehensive, Portfolio Building",
    color: "bg-cyan-50",
    colorDark: "dark:bg-cyan-900/30",
  },
];

// --- MAIN PAGE COMPONENT ---
export default function UIUXPathPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <ModernNavigation />
      
      <main className="flex-grow">
        
        {/* Hero Section: Path Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="default" className="mb-4 bg-cyan-600 hover:bg-cyan-700">
              Career Path
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Product Design & UI/UX Mastery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
              Learn to create beautiful, accessible, and intuitive digital experiences. Master the tools and principles of modern User Interface and User Experience design.
            </p>
            <Button size="xl" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow bg-cyan-600 hover:bg-cyan-700">
              View Full Curriculum (10 Courses) <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathSummary.map((item, index) => (
              <Card key={index} className="p-4 text-center border-2 border-cyan-200 dark:border-cyan-800">
                <CardHeader className="p-0 mb-3">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900 mx-auto">
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
              Featured Design Courses
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Get started with our popular ₹49 workshop or commit to the full career bootcamp.
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
                      <Button className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">
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
              The Product Designer Roadmap
            </h2>

            <div className="relative space-y-12">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="flex relative">
                  {/* Vertical Line Connector (Hidden on last item) */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="absolute left-3 top-10 bottom-0 w-1 bg-cyan-200 dark:bg-cyan-700"></div>
                  )}

                  {/* Dot/Icon */}
                  <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500 ring-4 ring-white dark:ring-black">
                    <Layers className="h-3 w-3 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 ml-6 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
                    <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-300 mb-2">
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
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cyan-100 dark:bg-cyan-900/50">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Design the Future?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                    Enroll in the full UI/UX Path today and master the art of creating intuitive and visually stunning digital products.
                </p>
                <Link href="/courses?path=ui-ux">
                    <Button size="xl" className="text-lg px-10 py-3 shadow-xl bg-cyan-600 hover:bg-cyan-700">
                        Enroll in UI/UX Path Now
                    </Button>
                </Link>
            </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
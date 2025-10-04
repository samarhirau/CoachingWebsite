
        


 


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { EnrollmentModal } from "@/components/enrollment-modal"
import { Code, Database, Smartphone, Cloud, Shield, Globe, BarChart, Cpu, PenTool, Layers, LineChart, Brain, Terminal, Camera, Briefcase } from "lucide-react"

export default function CoursesPage() {
         const courses = [
  {
    icon: Code,
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    description: "Master React, Node.js, MongoDB and build production-ready web applications",
    duration: "6 months",
    students: "150+ enrolled",
    rating: "4.9",
    price: "₹45,000",
    originalPrice: "₹60,000",
    features: ["React & Next.js", "Node.js & Express", "MongoDB", "AWS Deployment"],
    level: "Beginner to Advanced",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Database,
    slug: "data-science-ai",
    title: "Data Science & AI",
    description: "Learn Python, Machine Learning, and AI to become a data scientist",
    duration: "8 months",
    students: "120+ enrolled",
    rating: "4.8",
    price: "₹55,000",
    originalPrice: "₹75,000",
    features: ["Python & Pandas", "Machine Learning", "Deep Learning", "Data Visualization"],
    level: "Intermediate",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Smartphone,
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description: "Build native iOS and Android apps using React Native and Flutter",
    duration: "5 months",
    students: "80+ enrolled",
    rating: "4.7",
    price: "₹40,000",
    originalPrice: "₹55,000",
    features: ["React Native", "Flutter", "Firebase", "App Store Deployment"],
    level: "Intermediate",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Cloud,
    slug: "devops-cloud-computing",
    title: "DevOps & Cloud Computing",
    description: "Master AWS, Docker, Kubernetes and modern deployment practices",
    duration: "4 months",
    students: "60+ enrolled",
    rating: "4.9",
    price: "₹35,000",
    originalPrice: "₹50,000",
    features: ["AWS Services", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"],
    level: "Advanced",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    slug: "cybersecurity-ethical-hacking",
    title: "Cybersecurity & Ethical Hacking",
    description: "Defend systems against cyber threats and learn penetration testing",
    duration: "6 months",
    students: "90+ enrolled",
    rating: "4.8",
    price: "₹48,000",
    originalPrice: "₹65,000",
    features: ["Network Security", "Penetration Testing", "Firewalls", "Ethical Hacking Tools"],
    level: "Intermediate",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Globe,
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design intuitive interfaces and delightful user experiences",
    duration: "3 months",
    students: "100+ enrolled",
    rating: "4.6",
    price: "₹30,000",
    originalPrice: "₹45,000",
    features: ["Figma & Adobe XD", "Wireframing", "Prototyping", "Design Thinking"],
    level: "Beginner",
    color: "from-teal-500 to-green-500",
  },
  {
    icon: BarChart,
    slug: "business-analytics",
    title: "Business Analytics",
    description: "Analyze data to drive business decisions and growth",
    duration: "5 months",
    students: "70+ enrolled",
    rating: "4.7",
    price: "₹38,000",
    originalPrice: "₹52,000",
    features: ["Excel", "SQL", "Power BI", "Data Visualization"],
    level: "Intermediate",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Cpu,
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    description: "Dive deep into AI, neural networks, and reinforcement learning",
    duration: "7 months",
    students: "95+ enrolled",
    rating: "4.9",
    price: "₹60,000",
    originalPrice: "₹80,000",
    features: ["Neural Networks", "NLP", "Computer Vision", "Reinforcement Learning"],
    level: "Advanced",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: PenTool,
    slug: "graphic-design",
    title: "Graphic Design Mastery",
    description: "Learn Photoshop, Illustrator, and create stunning visuals",
    duration: "4 months",
    students: "110+ enrolled",
    rating: "4.6",
    price: "₹32,000",
    originalPrice: "₹48,000",
    features: ["Photoshop", "Illustrator", "Brand Identity", "Creative Design"],
    level: "Beginner to Intermediate",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Layers,
    slug: "blockchain-development",
    title: "Blockchain Development",
    description: "Learn Ethereum, smart contracts, and build decentralized apps",
    duration: "6 months",
    students: "50+ enrolled",
    rating: "4.7",
    price: "₹50,000",
    originalPrice: "₹70,000",
    features: ["Ethereum", "Smart Contracts", "Solidity", "DApps"],
    level: "Advanced",
    color: "from-gray-700 to-gray-900",
  },
  {
    icon: LineChart,
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Master SEO, social media, and performance marketing",
    duration: "3 months",
    students: "130+ enrolled",
    rating: "4.5",
    price: "₹25,000",
    originalPrice: "₹40,000",
    features: ["SEO", "Google Ads", "Content Marketing", "Analytics"],
    level: "Beginner to Intermediate",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Brain,
    slug: "machine-learning",
    title: "Machine Learning",
    description: "Hands-on ML with Python, TensorFlow, and real-world projects",
    duration: "6 months",
    students: "85+ enrolled",
    rating: "4.8",
    price: "₹42,000",
    originalPrice: "₹58,000",
    features: ["Supervised Learning", "Unsupervised Learning", "TensorFlow", "ML Projects"],
    level: "Intermediate to Advanced",
    color: "from-green-600 to-lime-500",
  },
  {
    icon: Terminal,
    slug: "competitive-programming",
    title: "Competitive Programming",
    description: "Sharpen your coding skills and ace coding interviews",
    duration: "4 months",
    students: "200+ enrolled",
    rating: "4.9",
    price: "₹28,000",
    originalPrice: "₹40,000",
    features: ["Data Structures", "Algorithms", "Problem Solving", "Coding Contests"],
    level: "Intermediate",
    color: "from-sky-500 to-blue-500",
  },
  {
    icon: Camera,
    slug: "photography-video-editing",
    title: "Photography & Video Editing",
    description: "Capture stunning photos and edit cinematic videos",
    duration: "3 months",
    students: "60+ enrolled",
    rating: "4.6",
    price: "₹22,000",
    originalPrice: "₹35,000",
    features: ["DSLR Basics", "Lightroom", "Premiere Pro", "Content Creation"],
    level: "Beginner",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Briefcase,
    slug: "project-management",
    title: "Project Management",
    description: "Master Agile, Scrum, and deliver successful projects",
    duration: "5 months",
    students: "75+ enrolled",
    rating: "4.7",
    price: "₹36,000",
    originalPrice: "₹50,000",
    features: ["Agile", "Scrum", "Project Planning", "Risk Management"],
    level: "Intermediate",
    color: "from-emerald-600 to-teal-600",
  },
];

  const initialLimit = 6
  const loadMoreCount = 5

  const [visibleCourses, setVisibleCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  useEffect(() => {
    // pehli baar sirf 6 dikhana
    setVisibleCourses(courses.slice(0, initialLimit))
  }, [])

  const handleLoadMore = () => {
    setVisibleCourses((prev) => {
      const nextCount = prev.length + loadMoreCount
      return courses.slice(0, nextCount)
    })
  }

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course)
    setIsEnrollmentOpen(true)
  }

  return (
    <main className="min-h-screen py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>
        
          <Button asChild variant="ghost" className="-ml-4 mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {visibleCourses.map((course, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${course.color}`} />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color} text-white`}>
                      <course.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <Badge variant="outline" className="mt-1">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{course.price}</div>
                    <div className="text-sm text-muted-foreground line-through">{course.originalPrice}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">What you'll learn:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">

                  // check if already enroll the course then show continue txt on button
                  <Button
  className="flex-1 gradient-primary group"
  onClick={() => handleEnrollClick(course)}
>
  {course.enrolled ? "Continue" : "Enroll Now"}
  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
</Button>


                  
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/courses/${course.slug}`}>Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCourses.length < courses.length && (
          <div className="text-center mt-10">
            <Button onClick={handleLoadMore} size="lg" variant="outline">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse} />
    </main>
  )
}

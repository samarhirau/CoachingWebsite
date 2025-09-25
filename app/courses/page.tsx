"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"

export default function CoursesPage() {
  const allCourses = [
    {
      title: "Full Stack Web Development",
      description: "Master React, Node.js, MongoDB and build production-ready apps.",
      duration: "6 months",
      students: "150+ enrolled",
      rating: "4.9",
      price: "₹45,000",
      level: "Beginner to Advanced",
    },
    {
      title: "Data Science & AI",
      description: "Learn Python, Machine Learning, and AI to become a data scientist.",
      duration: "8 months",
      students: "120+ enrolled",
      rating: "4.8",
      price: "₹55,000",
      level: "Intermediate",
    },
    {
      title: "Mobile App Development",
      description: "Build native iOS and Android apps using React Native and Flutter.",
      duration: "5 months",
      students: "80+ enrolled",
      rating: "4.7",
      price: "₹40,000",
      level: "Intermediate",
    },
    {
      title: "DevOps & Cloud Computing",
      description: "Master AWS, Docker, Kubernetes and modern deployment practices.",
      duration: "4 months",
      students: "60+ enrolled",
      rating: "4.9",
      price: "₹35,000",
      level: "Advanced",
    },
    {
      title: "Cybersecurity & Ethical Hacking",
      description: "Learn penetration testing, network security, and digital forensics.",
      duration: "6 months",
      students: "90+ enrolled",
      rating: "4.8",
      price: "₹50,000",
      level: "Intermediate to Advanced",
    },
    {
      title: "UI/UX Design Mastery",
      description: "Master Figma, design systems, and user experience principles.",
      duration: "4 months",
      students: "110+ enrolled",
      rating: "4.7",
      price: "₹30,000",
      level: "Beginner to Intermediate",
    },
    {
      title: "Blockchain Development",
      description: "Build decentralized applications using Solidity and Ethereum.",
      duration: "7 months",
      students: "70+ enrolled",
      rating: "4.8",
      price: "₹60,000",
      level: "Intermediate",
    },
    {
      title: "AI-Powered Chatbots",
      description: "Build and deploy intelligent chatbots using NLP and LLMs.",
      duration: "3 months",
      students: "50+ enrolled",
      rating: "4.9",
      price: "₹25,000",
      level: "Intermediate",
    },
    {
      title: "Game Development",
      description: "Learn Unity, C#, and game design to create stunning games.",
      duration: "5 months",
      students: "75+ enrolled",
      rating: "4.7",
      price: "₹45,000",
      level: "Beginner to Intermediate",
    },
    {
      title: "Cloud AI Engineering",
      description: "Deploy AI models on AWS, GCP, and Azure with best practices.",
      duration: "6 months",
      students: "65+ enrolled",
      rating: "4.8",
      price: "₹55,000",
      level: "Advanced",
    },
  ]

  const [visibleCount, setVisibleCount] = useState(5)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <main className="min-h-screen py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <div>
          <Button asChild variant="ghost" className="-ml-4 mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Our Courses</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.slice(0, visibleCount).map((course, idx) => (
            <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <Badge variant="outline" className="mt-1">{course.level}</Badge>
                  </div>
                  <div className="text-right font-bold text-primary">{course.price}</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">{course.description}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.students}</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {course.rating}</span>
                </div>
                <Link
  href={`/courses/${course.title
    .toLowerCase()
    .replace(/&/g, "")       
    .replace(/[^a-z0-9]+/g, "-") 
    .replace(/^-+|-+$/g, "")    
  }`}
  className="w-full"
>


                
                <Button className="w-full">View</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {visibleCount < allCourses.length && (
          <div className="text-center mt-10">
            <Button onClick={handleLoadMore} size="lg" variant="outline">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

"use client"

import { ModernNavigation } from "@/components/modern-navigation"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  Globe,
  Users,
  Target,
  BookOpen,
  TrendingUp,
  Shield,
  DollarSign,
  Lightbulb,
  Zap,
  Code,
  Layers,
  Briefcase,
  Trophy,
  Star,
} from "lucide-react"

// --- REVISED ACHIEVEMENTS (Focus on Digital Platform Metrics) ---
const achievements = [
  { icon: <Globe className="h-8 w-8 text-primary" />, title: "10K+ Global Learners", description: "Students enrolled from 5+ countries worldwide" },
  { icon: <DollarSign className="h-8 w-8 text-primary" />, title: "Courses from ₹29", description: "Making high-quality tech education highly affordable" },
  { icon: <TrendingUp className="h-8 w-8 text-primary" />, title: "98% Career Success", description: "Students placed or launched successful freelance careers" },
  { icon: <Code className="h-8 w-8 text-primary" />, title: "500+ Hours of Content", description: "Practical, project-based video content library" },
]

const timeline = [
  { year: "2020", title: "Foundation", description: "Upcoder was founded with the mission to democratize tech education." },
  { year: "2021", title: "Affordable Launch", description: "Launched our first low-cost courses to maximize accessibility." },
  { year: "2022", title: "MERN Path Release", description: "Released the flagship Full-Stack MERN Mastery Career Path." },
  { year: "2023", title: "Community Building", description: "Grew the learner community to 5,000+ active members." },
  { year: "2024", title: "Path Expansion", description: "Expanded offerings with dedicated UI/UX and Interview Prep Paths." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />

      <main>
        {/* Hero */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          <div className="max-w-7xl mx-auto relative text-center">
            {/* UPDATED BADGE */}
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Code className="h-4 w-4 mr-2" />
              100% Digital & Project-Based Learning
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              About <span className="text-gradient">Upcoder</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a passionate community focused on making modern tech skills affordable and accessible. Learn by doing, build a job-ready portfolio, and launch your career.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Mission: Affordable Mastery</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2020 by developers, for developers, Upcoder recognized the need for highly practical, high-quality coding education that doesn't require a hefty tuition fee. 
                We focus on concise, job-focused curriculum and real-world project experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our approach replaces outdated classroom methods with modern, self-paced content, mentorship, and community-driven support, ensuring every learner can transform their career trajectory, regardless of their financial background.
              </p>
              <Link href="/courses">
                <Button size="lg" className="group">
                  Explore All Courses
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-card border rounded-2xl p-8 shadow-2xl">
                {/* Replaced generic placeholder URL with a different generic placeholder URL */}
                <img 
                  src="practicalLearning.png" 
                  alt="Practical learning environment" 
                  className="w-full h-72 object-cover rounded-xl" 
                />
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-primary">₹29</div>
                  <div className="text-sm text-muted-foreground">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoder by the Numbers</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality, affordability, and community success
            </p>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((a, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {a.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths - UPDATED to reflect your specific Paths */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Career Paths</h2>
            <p className="text-lg text-muted-foreground">Structured programs to take you from zero to job-ready</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: <Code className="h-8 w-8 text-indigo-500" />, title: "Frontend Development", desc: "Build modern UIs with React and Next.js.", link: "/paths/frontend" },
              { icon: <Layers className="h-8 w-8 text-red-500" />, title: "MERN Stack Mastery", desc: "Master Full-Stack development from database to deployment.", link: "/paths/mern" },
              { icon: <Target className="h-8 w-8 text-cyan-500" />, title: "UI/UX Product Design", desc: "Create intuitive, user-centric digital experiences.", link: "/paths/ui-ux" },
              { icon: <Trophy className="h-8 w-8 text-yellow-500" />, title: "Interview Preparation", desc: "Crack technical rounds with DSA, Aptitude, and Mock Interviews.", link: "/paths/interview-prep" },
            ].map((p, i) => (
              <Link href={p.link} key={i}>
                <Card className="text-center h-full hover:shadow-xl hover:border-primary transition duration-300">
                  <CardContent className="p-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {p.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Student Stories */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Success is the Upcoder Standard</h2>
            <p className="text-lg text-muted-foreground">Hear from our growing community of tech professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {["Aarav", "Meera", "Rohit"].map((name, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                  <p className="text-muted-foreground italic">
                    “The MERN Stack course was incredibly practical. I went from zero knowledge to landing a job in 8 months. Highly recommend Upcoder's approach.”
                  </p>
                  <div className="mt-4 font-semibold">{name}</div>
                  <div className="text-sm text-muted-foreground">Full Stack Developer @ Tech Startup</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary/10 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Start Building?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are transforming their careers with Upcoder. Enroll in your first course for just ₹29!
          </p>
          <Link href="/courses">
            <Button size="lg" className="group">
              Explore All Courses
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>

        <ValuesSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}
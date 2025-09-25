"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Users, Award, TrendingUp, ArrowRight } from "lucide-react"
import { useState } from "react"

export function ModernHero() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm">
                🚀 New Batch Starting January 2025
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Master <span className="text-gradient">Coding Skills</span> with Industry Experts
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your career with our comprehensive coding bootcamp. Learn from industry professionals and work
                on real-world projects that matter.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">₹8L</div>
                <div className="text-sm text-muted-foreground">Avg. Package</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsPlaying(!isPlaying)} className="group">
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">1000+ Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Industry Certified</span>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Dashboard */}
          <div className="relative">
            <Card className="p-6 hover-lift glass-effect">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Student Progress</h3>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +25%
                  </Badge>
                </div>

                {/* Progress Chart Mockup */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>JavaScript Mastery</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>React Development</span>
                      <span className="text-primary">72%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[72%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Node.js Backend</span>
                      <span className="text-primary">68%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[68%]" />
                    </div>
                  </div>
                </div>

                {/* Achievement Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-primary/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">12</div>
                    <div className="text-xs text-muted-foreground">Projects Done</div>
                  </div>
                  <div className="bg-success/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-success">98%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

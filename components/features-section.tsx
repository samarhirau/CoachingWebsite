"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Briefcase, Trophy } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Code,
      title: "Hands-on Coding",
      description: "Learn by building real projects with industry-standard tools and frameworks",
      badge: "Practical",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get guidance from senior developers with 10+ years of industry experience",
      badge: "1-on-1",
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: Briefcase,
      title: "Job Placement",
      description: "95% placement rate with top companies and startups across India",
      badge: "Guaranteed",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Trophy,
      title: "Industry Projects",
      description: "Work on live projects from our partner companies during the course",
      badge: "Real-world",
      color: "bg-orange-500/10 text-orange-600",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose RidBharat
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn with the <span className="text-gradient">Best in Industry</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive approach ensures you not only learn to code but also develop the skills needed to excel in
            your career
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-2xl p-8 shadow-sm">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Students Trained</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">₹8.5L</div>
              <div className="text-sm text-muted-foreground">Average Package</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Hiring Partners</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

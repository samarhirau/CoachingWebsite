"use client";
import { ModernNavigation } from "@/components/modern-navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, CheckCircle, ArrowRight, Target, BookOpen, TrendingUp } from "lucide-react"
import { EnrollmentModal } from "@/components/enrollment-modal"
import { useState } from "react"

const programs = [
  {
    title: "Career Transition Coaching",
    duration: "3 months",
    type: "1-on-1 Coaching",
    price: "₹25,000",
    description: "Personalized coaching to help you transition into a tech career successfully.",
    modules: [
      "Career Assessment",
      "Skill Gap Analysis",
      "Learning Roadmap",
      "Interview Preparation",
      "Salary Negotiation",
    ],
    features: [
      "Weekly 1-on-1 sessions",
      "Personalized career roadmap",
      "Resume and LinkedIn optimization",
      "Mock interview sessions",
      "Industry networking guidance",
    ],
    popular: true,
  },
  {
    title: "Technical Skill Development",
    duration: "4 months",
    type: "Group Coaching",
    price: "₹20,000",
    description: "Focused coaching to develop and enhance your technical skills for specific roles.",
    modules: ["Skill Assessment", "Learning Strategy", "Project Planning", "Code Review", "Portfolio Building"],
    features: [
      "Bi-weekly group sessions",
      "Technical skill assessment",
      "Hands-on project guidance",
      "Code review and feedback",
      "Portfolio development support",
    ],
  },
  {
    title: "Leadership & Soft Skills",
    duration: "2 months",
    type: "Workshop Series",
    price: "₹15,000",
    description: "Develop leadership and communication skills essential for career advancement.",
    modules: [
      "Communication Skills",
      "Team Leadership",
      "Project Management",
      "Presentation Skills",
      "Conflict Resolution",
    ],
    features: [
      "Interactive workshops",
      "Real-world case studies",
      "Peer learning opportunities",
      "Presentation practice",
      "Leadership assessment",
    ],
  },
]

const benefits = [
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Personalized Approach",
    description: "Tailored coaching programs designed to meet your specific career goals and challenges.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Expert Coaches",
    description: "Learn from industry professionals with years of experience in tech leadership roles.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Proven Results",
    description: "Track record of helping professionals advance their careers and increase their earning potential.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Comprehensive Resources",
    description: "Access to exclusive resources, templates, and tools to support your career growth.",
  },
]

export default function CoachingPage() {

    const [selectedCourse, setSelectedCourse] = useState<any>(null)
    const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)


      const handleEnrollClick = (course: any) => {
    setSelectedCourse(course)
    setIsEnrollmentOpen(true)
  }


  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Professional <span className="text-primary">Career Coaching</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Accelerate your career growth with personalized coaching programs designed to help you achieve your
              professional goals in the tech industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Success Stories
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Why Choose Our Coaching Programs?</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Our coaching approach is designed to provide you with the guidance and support you need to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Coaching Programs</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Choose from our specialized coaching programs designed to address different aspects of career
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className={`relative ${program.popular ? "border-primary shadow-lg" : ""}`}>
                  {program.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{program.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <CardDescription className="text-base">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">{program.price}</div>
                      <p className="text-sm text-muted-foreground">Complete program</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Program Modules:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.modules.map((module, moduleIndex) => (
                          <Badge key={moduleIndex} variant="outline" className="text-xs">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" onClick={() => handleEnrollClick(program)}>
                      Enroll in {program.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Success Record</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Real results from our coaching programs that speak for themselves.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  metric: "95%",
                  label: "Career Advancement Rate",
                  description: "Of our clients achieve their career goals",
                },
                { metric: "40%", label: "Average Salary Increase", description: "Salary improvement after coaching" },
                { metric: "500+", label: "Professionals Coached", description: "Successful career transformations" },
                { metric: "4.9/5", label: "Client Satisfaction", description: "Average rating from our clients" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.metric}</div>
                  <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-xl text-primary-foreground/90 text-balance mb-8">
              Take the first step towards achieving your career goals with our personalized coaching programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Download Career Assessment
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
            <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={selectedCourse} />
      
    </div>
  )
}

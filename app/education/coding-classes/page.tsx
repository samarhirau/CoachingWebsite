import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Clock, Users, Award, CheckCircle, ArrowRight, Laptop } from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"

const courses = [
  {
    title: "Full-Stack Web Development",
    duration: "6 months",
    level: "Beginner to Advanced",
    price: "₹45,000",
    description: "Master modern web development with React, Node.js, and database technologies.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"],
    features: [
      "Live coding sessions",
      "Real-time project development",
      "Industry mentorship",
      "Job placement assistance",
      "Certificate of completion",
    ],
    popular: true,
  },
  {
    title: "Python Programming & Django",
    duration: "4 months",
    level: "Beginner to Intermediate",
    price: "₹35,000",
    description: "Learn Python programming and web development with Django framework.",
    technologies: ["Python", "Django", "PostgreSQL", "REST APIs", "Git", "AWS"],
    features: [
      "Hands-on Python projects",
      "Django web applications",
      "Database design",
      "API development",
      "Deployment strategies",
    ],
  },
  {
    title: "Mobile App Development",
    duration: "5 months",
    level: "Intermediate",
    price: "₹50,000",
    description: "Build cross-platform mobile applications using React Native.",
    technologies: ["React Native", "JavaScript", "Firebase", "Redux", "Expo", "Native APIs"],
    features: [
      "iOS and Android development",
      "Real device testing",
      "App store deployment",
      "Performance optimization",
      "Push notifications",
    ],
  },
]

const benefits = [
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Industry-Standard Curriculum",
    description: "Learn the latest technologies and frameworks used by top companies.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Expert Instructors",
    description: "Learn from experienced developers with real industry experience.",
  },
  {
    icon: <Laptop className="h-6 w-6 text-primary" />,
    title: "Hands-On Projects",
    description: "Build real applications that you can showcase in your portfolio.",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Industry Certification",
    description: "Receive recognized certificates upon successful completion.",
  },
]

export default function CodingClassesPage() {
  return (
    <div className="min-h-screen">
        <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Master <span className="text-primary">Coding</span> Skills
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Join our comprehensive coding bootcamps and transform your career with industry-relevant skills. Learn
              from experts, work on real projects, and get job placement assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Enroll Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download Curriculum
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Why Choose Our Coding Classes?</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                We provide comprehensive training that prepares you for real-world development challenges.
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

        {/* Courses Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Coding Programs</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Choose from our comprehensive coding programs designed for different skill levels and career goals.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <Card key={index} className={`relative ${course.popular ? "border-primary shadow-lg" : ""}`}>
                  {course.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.level}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary mb-2">{course.price}</div>
                      <p className="text-sm text-muted-foreground">One-time payment</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Technologies Covered:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">What You'll Get:</h4>
                      <ul className="space-y-2">
                        {course.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
                      Enroll in {course.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Ready to Start Your Coding Journey?</h2>
            <p className="text-xl text-primary-foreground/90 text-balance mb-8">
              Join hundreds of students who have successfully transitioned into tech careers through our programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Schedule Free Demo Class
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Talk to Career Counselor
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

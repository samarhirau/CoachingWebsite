"use client"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Award, CheckCircle, ArrowRight, Briefcase, Code } from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"
import { ApplyModal } from "@/components/apply-internship"
import { useState } from "react"

const programs = [
  {
    title: "Full-Stack Development Internship",
    duration: "6 months",
    type: "Paid Internship",
    stipend: "₹15,000/month",
    description: "Work on real client projects using modern web technologies with experienced mentors.",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "Git", "Agile"],
    responsibilities: [
      "Develop responsive web applications",
      "Collaborate with senior developers",
      "Participate in code reviews",
      "Work on client projects",
      "Learn industry best practices",
    ],
    requirements: ["Basic knowledge of JavaScript", "Understanding of HTML/CSS", "Willingness to learn"],
    popular: true,
  },
  {
    title: "Mobile App Development Internship",
    duration: "4 months",
    type: "Project-Based",
    stipend: "₹12,000/month",
    description: "Build mobile applications for real clients using React Native and Flutter.",
    technologies: ["React Native", "Flutter", "Firebase", "Redux", "REST APIs"],
    responsibilities: [
      "Develop cross-platform mobile apps",
      "Implement UI/UX designs",
      "Integrate APIs and databases",
      "Test on real devices",
      "Deploy to app stores",
    ],
    requirements: ["Basic programming knowledge", "Interest in mobile development", "Problem-solving skills"],
  },
  {
    title: "Data Science & Analytics Internship",
    duration: "5 months",
    type: "Research-Based",
    stipend: "₹18,000/month",
    description: "Work on data analysis projects and machine learning models for business insights.",
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Tableau", "SQL"],
    responsibilities: [
      "Analyze business data",
      "Create data visualizations",
      "Build predictive models",
      "Generate insights and reports",
      "Present findings to stakeholders",
    ],
    requirements: ["Basic Python knowledge", "Statistics fundamentals", "Analytical mindset"],
  },
]

const benefits = [
  {
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    title: "Real Project Experience",
    description: "Work on actual client projects that impact real businesses and users.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Industry Mentorship",
    description: "Get guidance from experienced professionals in the tech industry.",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Professional Certificate",
    description: "Receive industry-recognized certificates upon successful completion.",
  },
  {
    icon: <Code className="h-6 w-6 text-primary" />,
    title: "Job Placement Support",
    description: "Get assistance with job placement and career guidance after completion.",
  },
]

export default function InternshipsPage() {


  const [isApplyOpen, setIsApplyOpen] = useState(false)

  const handleApplyClick = () => {
    
    setIsApplyOpen(true)
  }

  return (
    <div className="min-h-screen">
          <ModernNavigation/>
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Professional <span className="text-primary">Internship</span> Programs
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Gain hands-on experience with real-time projects, work alongside industry experts, and kickstart your tech
              career with our comprehensive internship programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Apply for Internship
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download Program Details
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Why Choose Our Internship Programs?</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Our internships provide real-world experience that prepares you for a successful tech career.
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
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Available Internship Programs</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Choose from our specialized internship programs designed to give you industry-relevant experience.
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
                      <div className="text-2xl font-bold text-primary mb-2">{program.stipend}</div>
                      <p className="text-sm text-muted-foreground">Monthly stipend</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Technologies You'll Use:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {program.responsibilities.slice(0, 3).map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-1">
                        {program.requirements.map((requirement, reqIndex) => (
                          <li key={reqIndex} className="flex items-center text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>

                   <Button className="w-full" onClick={() => handleApplyClick()}>
                      Enroll in {program.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Application Process</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Simple and straightforward process to join our internship programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Apply Online", description: "Submit your application with resume and portfolio" },
                {
                  step: "2",
                  title: "Technical Assessment",
                  description: "Complete a coding challenge or technical test",
                },
                { step: "3", title: "Interview", description: "One-on-one interview with our technical team" },
                {
                  step: "4",
                  title: "Start Internship",
                  description: "Begin your journey with orientation and project assignment",
                },
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Ready to Launch Your Tech Career?</h2>
            <p className="text-xl text-primary-foreground/90 text-balance mb-8">
              Join our internship programs and gain the real-world experience that employers are looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Schedule Info Session
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ApplyModal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)}/>
    </div>
  )
}

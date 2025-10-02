
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Zap,
  Shield,
  Code,
  BarChart3,
  Headphones,
  Globe,
  ArrowRight,
  GraduationCap,
  Laptop,
  BookOpen,
} from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"

const services = [
  {
    title: "Business Consulting",
    description: "Strategic guidance to help your business thrive in the Indian market.",
    features: [
      "Market analysis and research",
      "Business strategy development",
      "Growth planning and execution",
      "Competitive analysis",
      "Risk assessment and mitigation",
    ],
    price: "Starting at ₹25,000",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    popular: true,
  },
  {
    title: "Digital Transformation",
    description: "Modernize your business with cutting-edge digital solutions.",
    features: [
      "Digital strategy planning",
      "Technology implementation",
      "Process automation",
      "Cloud migration services",
      "Digital training programs",
    ],
    price: "Starting at ₹50,000",
    icon: <Zap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Customer Support Solutions",
    description: "24/7 multilingual support services for your customers.",
    features: [
      "Multi-language support (Hindi, English, Regional)",
      "24/7 availability",
      "Omnichannel support",
      "CRM integration",
      "Performance analytics",
    ],
    price: "Starting at ₹15,000/month",
    icon: <Headphones className="h-6 w-6 text-primary" />,
  },
  {
    title: "Web Development",
    description: "Custom websites and applications built for the Indian market.",
    features: [
      "Responsive web design",
      "E-commerce solutions",
      "Mobile app development",
      "SEO optimization",
      "Maintenance and support",
    ],
    price: "Starting at ₹75,000",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
  {
    title: "Data Analytics",
    description: "Turn your data into actionable insights for better decision making.",
    features: [
      "Business intelligence dashboards",
      "Predictive analytics",
      "Market research analysis",
      "Performance tracking",
      "Custom reporting solutions",
    ],
    price: "Starting at ₹40,000",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    title: "Security & Compliance",
    description: "Protect your business with enterprise-grade security solutions.",
    features: [
      "Cybersecurity assessment",
      "Compliance consulting",
      "Data protection strategies",
      "Security training",
      "Incident response planning",
    ],
    price: "Starting at ₹35,000",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "Coding Bootcamp",
    description: "Intensive coding programs to master modern web development technologies.",
    features: [
      "Full-stack JavaScript (React, Node.js)",
      "Python programming and frameworks",
      "Database design and management",
      "Real-time project development",
      "Industry-standard tools and practices",
    ],
    price: "Starting at ₹45,000",
    icon: <Code className="h-6 w-6 text-primary" />,
    popular: true,
  },
  {
    title: "Professional Coaching",
    description: "Personalized career coaching and skill development programs.",
    features: [
      "Career planning and guidance",
      "Technical skill assessment",
      "Interview preparation and mock sessions",
      "Resume building and LinkedIn optimization",
      "Soft skills development",
    ],
    price: "Starting at ₹20,000",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Internship Programs",
    description: "Hands-on internship opportunities with real-time projects and mentorship.",
    features: [
      "3-6 month structured programs",
      "Real client project experience",
      "One-on-one mentorship",
      "Industry certification",
      "Job placement assistance",
    ],
    price: "Starting at ₹10,000",
    icon: <Laptop className="h-6 w-6 text-primary" />,
  },
]

const industries = [
  {
    name: "E-commerce & Retail",
    description: "Specialized solutions for online and offline retail businesses",
    icon: <Globe className="h-8 w-8 text-primary" />,
  },
  {
    name: "Healthcare",
    description: "HIPAA-compliant solutions for healthcare providers",
    icon: <Shield className="h-8 w-8 text-primary" />,
  },
  {
    name: "Education & Training",
    description: "Digital learning platforms and educational technology solutions",
    icon: <BookOpen className="h-8 w-8 text-primary" />,
  },
  {
    name: "Financial Services",
    description: "Secure and compliant solutions for financial institutions",
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Comprehensive solutions designed to help your business succeed in the Indian market. From strategy to
              implementation, plus professional education and career development programs.
            </p>
            <Button size="lg">
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Choose Your Solution</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Professional services tailored to meet your specific business needs and career development goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  price={service.price}
                  popular={service.popular}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Industries We Serve</h2>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Deep expertise across key industries in the Indian market, including education and professional
                development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry, index) => (
                <div key={index} className="text-center group">
                  <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
              Ready to Transform Your Career or Business?
            </h2>
            <p className="text-xl text-primary-foreground/90 text-balance mb-8">
              Whether you're looking to advance your career through our coding classes and coaching programs, or
              transform your business with our professional services, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                View Programs & Case Studies
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

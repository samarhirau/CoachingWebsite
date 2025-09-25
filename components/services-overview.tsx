import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Zap, ArrowRight, Code, GraduationCap, Laptop } from "lucide-react"

const services = [
  {
    icon: Briefcase,
    title: "Business Solutions",
    description: "Comprehensive business consulting and strategy development tailored for the Indian market.",
    features: ["Market Analysis", "Strategy Planning", "Growth Consulting"],
  },
  {
    icon: Users,
    title: "Customer Support",
    description: "24/7 dedicated support in multiple Indian languages to serve our diverse customer base.",
    features: ["Multi-language Support", "24/7 Availability", "Expert Assistance"],
  },
  {
    icon: Zap,
    title: "Digital Innovation",
    description: "Cutting-edge digital solutions to modernize your business and reach new heights.",
    features: ["Digital Transformation", "Technology Integration", "Innovation Consulting"],
  },
  {
    icon: Code,
    title: "Coding Classes",
    description: "Professional coding bootcamps and classes to master modern web development technologies.",
    features: ["Full-Stack Development", "React & Node.js", "Live Projects"],
  },
  {
    icon: GraduationCap,
    title: "Professional Coaching",
    description: "Career guidance and skill development coaching to accelerate your professional growth.",
    features: ["Career Planning", "Skill Assessment", "Interview Preparation"],
  },
  {
    icon: Laptop,
    title: "Internship Programs",
    description: "Hands-on internship opportunities with real-time projects and industry mentorship.",
    features: ["Real Projects", "Industry Mentorship", "Certificate Programs"],
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Comprehensive solutions designed to meet the unique needs of Indian businesses and individuals, including
            professional education and career development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

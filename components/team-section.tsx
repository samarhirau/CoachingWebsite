import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image: "/team-member-1.png",
    description: "With over 15 years of experience in the Indian market, Rajesh leads our vision of excellence.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    image: "images/team-2.png",
    description: "Priya ensures seamless operations across all our service verticals with her strategic expertise.",
  },
  {
    name: "Amit Patel",
    role: "Technology Director",
    image: "/indian-tech-executive.png",
    description: "Amit drives our digital innovation initiatives and technology transformation projects.",
  },
  {
    name: "Sneha Reddy",
    role: "Customer Success Manager",
    image: "/professional-indian-woman-customer-service-manager.jpg",
    description: "Sneha leads our customer success initiatives, ensuring exceptional service delivery.",
  },
]

export function TeamSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Our dedicated professionals bring years of experience and deep understanding of the Indian market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/10 group-hover:border-primary/20 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

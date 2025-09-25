import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Target, Users, Zap } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make is guided by what's best for our customers and their success.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, setting high standards and exceeding expectations.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and building strong partnerships with our clients.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We embrace new technologies and innovative approaches to solve complex challenges.",
  },
]

export function ValuesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            The principles that guide our work and define our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

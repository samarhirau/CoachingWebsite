// import { ModernNavigation } from "@/components/modern-navigation"
// import { Footer } from "@/components/footer"
// import { TeamSection } from "@/components/team-section"
// import { ValuesSection } from "@/components/values-section"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   ArrowRight,
//   Award,
//   Globe,
//   Users,
//   Target,
//   BookOpen,
//   TrendingUp,
//   Shield,
//   Heart,
//   Lightbulb,
//   Zap,
// } from "lucide-react"

// const achievements = [
//   {
//     icon: <Award className="h-8 w-8 text-primary" />,
//     title: "ISO 9001:2015 Certified",
//     description: "Quality management system certification",
//   },
//   {
//     icon: <Shield className="h-8 w-8 text-primary" />,
//     title: "Government Recognized",
//     description: "Certified by Central Government",
//   },
//   {
//     icon: <TrendingUp className="h-8 w-8 text-primary" />,
//     title: "98% Success Rate",
//     description: "Student placement and satisfaction",
//   },
//   {
//     icon: <BookOpen className="h-8 w-8 text-primary" />,
//     title: "500+ Courses",
//     description: "Comprehensive learning programs",
//   },
// ]

// const timeline = [
//   {
//     year: "2020",
//     title: "Foundation",
//     description: "Upcoder was founded with a vision to bridge traditional and modern education",
//   },
//   {
//     year: "2021",
//     title: "First 1000 Students",
//     description: "Reached our first milestone of 1000 successful students",
//   },
//   {
//     year: "2022",
//     title: "National Expansion",
//     description: "Expanded operations to 25+ cities across India",
//   },
//   {
//     year: "2023",
//     title: "Industry Partnerships",
//     description: "Formed strategic partnerships with leading tech companies",
//   },
//   {
//     year: "2024",
//     title: "Innovation Hub",
//     description: "Launched our state-of-the-art innovation and research center",
//   },
// ]

// export default function AboutPage() {

  
//   return (
//     <div className="min-h-screen">
//       <ModernNavigation  /> 
//       <main>
//         {/* Hero Section */}
//         <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>

//           <div className="max-w-7xl mx-auto relative">
//             <div className="text-center mb-16">
//               <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
//                 <Award className="h-4 w-4 mr-2" />
//                 ISO 9001:2015 Certified Institute
//               </Badge>

//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
//                 About{" "}
//                 <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
//                   Upcoder
//                 </span>
//               </h1>
//               <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
//                 Empowering the next generation of innovators through world-class coaching, research opportunities, and
//                 industry-aligned education that transforms careers and builds futures.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div className="space-y-6">
//                 <h2 className="text-3xl font-bold text-balance">Our Story</h2>
//                 <p className="text-lg text-muted-foreground leading-relaxed">
//                   Founded in 2020, Upcoder emerged from a simple yet powerful vision: to create India's most
//                   innovative coaching institute that combines traditional teaching excellence with cutting-edge
//                   technology and research opportunities.
//                 </p>
//                 <p className="text-lg text-muted-foreground leading-relaxed">
//                   Today, we've successfully coached over 10,000 students across 50+ cities, with an industry-leading 98%
//                   placement rate and partnerships with top companies for internships and job placements.
//                 </p>
//                 <Button size="lg" className="group">
//                   Explore Our Programs
//                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </Button>
//               </div>

//               <div className="relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
//                 <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
//                   <img
//                     src="/modern-coaching-institute-classroom.jpg"
//                     alt="Upcoder modern coaching facility"
//                     className="w-full h-64 sm:h-80 object-cover rounded-xl"
//                   />
//                   <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg border">
//                     <div className="text-2xl font-bold text-primary">98%</div>
//                     <div className="text-sm text-muted-foreground">Success Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Achievements</h2>
//               <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
//                 Recognition and certifications that validate our commitment to excellence
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {achievements.map((achievement, index) => (
//                 <Card
//                   key={index}
//                   className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
//                 >
//                   <CardContent className="p-6">
//                     <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
//                       {achievement.icon}
//                     </div>
//                     <h3 className="font-semibold mb-2">{achievement.title}</h3>
//                     <p className="text-sm text-muted-foreground">{achievement.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Mission & Vision */}
//         <section className="py-16 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div className="space-y-6">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
//                   <Target className="h-8 w-8 text-primary" />
//                 </div>
//                 <h2 className="text-3xl font-bold">Our Mission</h2>
//                 <p className="text-lg text-muted-foreground leading-relaxed">
//                   To empower students and professionals with world-class coaching, innovative research opportunities,
//                   and industry-relevant skills that prepare them for successful careers in the rapidly evolving
//                   technology landscape.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-3">
//                     <Lightbulb className="h-5 w-5 text-primary" />
//                     <span className="text-sm">Innovation-driven curriculum</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Heart className="h-5 w-5 text-primary" />
//                     <span className="text-sm">Student-centric approach</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Zap className="h-5 w-5 text-primary" />
//                     <span className="text-sm">Industry-aligned training</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
//                   <Globe className="h-8 w-8 text-primary" />
//                 </div>
//                 <h2 className="text-3xl font-bold">Our Vision</h2>
//                 <p className="text-lg text-muted-foreground leading-relaxed">
//                   To be India's premier coaching institute, recognized globally for excellence in education, research
//                   innovation, and creating the next generation of technology leaders who will shape the future of India
//                   and the world.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Journey</h2>
//               <p className="text-xl text-muted-foreground text-balance">
//                 Milestones that mark our growth and commitment to excellence
//               </p>
//             </div>

//             <div className="relative">
//               <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
//               <div className="space-y-8">
//                 {timeline.map((item, index) => (
//                   <div key={index} className="relative flex items-start gap-6">
//                     <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
//                       {item.year}
//                     </div>
//                     <div className="flex-1 pb-8">
//                       <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                       <p className="text-muted-foreground">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Stats */}
//         <section className="py-16 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Our Impact</h2>
//               <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
//                 Numbers that reflect our commitment to excellence and student success.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="text-center group">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
//                   <Users className="h-8 w-8 text-primary" />
//                 </div>
//                 <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
//                 <div className="text-lg text-muted-foreground">Students Coached</div>
//                 <p className="text-sm text-muted-foreground mt-2">
//                   Successful students who achieved their career goals
//                 </p>
//               </div>

//               <div className="text-center group">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
//                   <Globe className="h-8 w-8 text-primary" />
//                 </div>
//                 <div className="text-4xl font-bold text-primary mb-2">50+</div>
//                 <div className="text-lg text-muted-foreground">Cities Served</div>
//                 <p className="text-sm text-muted-foreground mt-2">Nationwide presence with local expertise</p>
//               </div>

//               <div className="text-center group">
//                 <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
//                   <Award className="h-8 w-8 text-primary" />
//                 </div>
//                 <div className="text-4xl font-bold text-primary mb-2">98%</div>
//                 <div className="text-lg text-muted-foreground">Success Rate</div>
//                 <p className="text-sm text-muted-foreground mt-2">Student placement and career advancement rate</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <ValuesSection />
//         <TeamSection />
//       </main>
//       <Footer />
//     </div>
//   )
// }
"use client"

import { ModernNavigation } from "@/components/modern-navigation"
import { Footer } from "@/components/footer"
import { TeamSection } from "@/components/team-section"
import { ValuesSection } from "@/components/values-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Award,
  Globe,
  Users,
  Target,
  BookOpen,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  Zap,
  Code,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react"

const achievements = [
  { icon: <Award className="h-8 w-8 text-primary" />, title: "ISO 9001:2015 Certified", description: "Quality management system certification" },
  { icon: <Shield className="h-8 w-8 text-primary" />, title: "Govt Recognized", description: "Certified by Central Government" },
  { icon: <TrendingUp className="h-8 w-8 text-primary" />, title: "98% Success Rate", description: "Student placement and satisfaction" },
  { icon: <BookOpen className="h-8 w-8 text-primary" />, title: "500+ Courses", description: "Comprehensive learning programs" },
]

const timeline = [
  { year: "2020", title: "Foundation", description: "Upcoder was founded to bridge traditional and modern tech education" },
  { year: "2021", title: "First 1000 Students", description: "Reached our first milestone of 1000 successful students" },
  { year: "2022", title: "National Expansion", description: "Expanded operations to 25+ cities across India" },
  { year: "2023", title: "Industry Partnerships", description: "Formed partnerships with leading tech companies" },
  { year: "2024", title: "Innovation Hub", description: "Launched our Research and Innovation Center" },
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
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <Award className="h-4 w-4 mr-2" />
              ISO 9001:2015 Certified Institute
            </Badge>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              About <span className="text-gradient">Upcoder</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering the next generation of innovators through world-class coding education, mentorship, and real-world experience.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2020, Upcoder emerged from a vision to make coding accessible and career-oriented. 
                With our project-based curriculum, expert mentors, and placement support, 
                we’ve helped over 10,000 students transform their tech careers.
              </p>
              <Button size="lg" className="group">
                Explore Our Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card border rounded-2xl p-8 shadow-2xl">
                <img src="/modern-coaching-institute-classroom.jpg" alt="Upcoder classroom" className="w-full h-72 object-cover rounded-xl" />
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recognition that showcases our excellence and commitment
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

        {/* Learning Paths */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Learning Paths</h2>
            <p className="text-lg text-muted-foreground">Choose your path and start coding the future</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { icon: <Code className="h-8 w-8 text-primary" />, title: "Web Development", desc: "Master MERN Stack and build real-world web apps" },
              { icon: <Briefcase className="h-8 w-8 text-primary" />, title: "Data Structures & Algorithms", desc: "Crack interviews with deep problem-solving skills" },
              { icon: <GraduationCap className="h-8 w-8 text-primary" />, title: "AI & Machine Learning", desc: "Learn to build intelligent systems using Python" },
            ].map((p, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {p.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Student Stories */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Student Success Stories</h2>
            <p className="text-lg text-muted-foreground">See how Upcoder transformed lives</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {["Aarav", "Meera", "Rohit"].map((name, i) => (
              <Card key={i} className="text-center hover:shadow-xl transition">
                <CardContent className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                  <p className="text-muted-foreground italic">
                    “Upcoder helped me land my first developer job! The mentors were amazing.”
                  </p>
                  <div className="mt-4 font-semibold">{name}</div>
                  <div className="text-sm text-muted-foreground">Full Stack Developer</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-primary/10 to-blue-100">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to <span className="text-gradient">Level Up?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are transforming their careers with Upcoder. Learn, code, and grow — The Upcoder Way.
          </p>
          <Button size="lg" className="group">
            Join the Upcoder Community
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>

        <ValuesSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}

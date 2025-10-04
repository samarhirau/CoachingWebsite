

// "use client"

// import { useState } from "react"
// import { useParams } from "next/navigation"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Clock, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
// import { EnrollmentModal } from "@/components/enrollment-modal"

// // data/courses.ts

// export const courses = [
//   {
//     slug: "full-stack-web-development",
//     title: "Full Stack Web Development",
//     description: "Master React, Node.js, MongoDB and build production-ready web applications.",
//     duration: "6 months",
//     students: "150+ enrolled",
//     rating: "4.9",
//     price: "₹45,000",
//     originalPrice: "₹60,000",
//     features: [
//       "React & Next.js",
//       "Node.js & Express",
//       "MongoDB",
//       "AWS Deployment",
//       "Authentication & Security",
//       "CI/CD Pipelines",
//       "Real-world Projects",
//       "Interview Preparation",
//     ],
//     level: "Beginner to Advanced",
//     color: "from-blue-500 to-cyan-500",
//     details:
//       "This program is designed to take you from absolute beginner to professional full-stack developer.",
//     plan: [
//       { week: "Week 1-2", topic: "HTML, CSS & JavaScript Fundamentals" },
//       { week: "Week 3-4", topic: "React & Next.js Basics" },
//       { week: "Week 5-6", topic: "Advanced React, State Management" },
//       { week: "Week 7-8", topic: "Node.js & Express.js" },
//       { week: "Week 9-10", topic: "MongoDB & Database Design" },
//       { week: "Week 11-12", topic: "Authentication & Security" },
//       { week: "Week 13-14", topic: "Deployment with AWS & CI/CD" },
//     ],
//     roadmap: [
//       "Frontend Development",
//       "Backend Development",
//       "Databases",
//       "Authentication & APIs",
//       "Deployment",
//       "Final Capstone Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Frontend fundamentals & React" },
//       { month: "Month 2", focus: "Advanced React & Next.js" },
//       { month: "Month 3", focus: "Backend with Node.js & Express" },
//       { month: "Month 4", focus: "MongoDB + APIs + Authentication" },
//       { month: "Month 5", focus: "DevOps, Docker & AWS Deployment" },
//       { month: "Month 6", focus: "Capstone Project & Interview Prep" },
//     ],
//   },
//   {
//     slug: "mobile-app-development",
//     title: "Mobile App Development",
//     description: "Build powerful mobile apps with Flutter & React Native.",
//     duration: "5 months",
//     students: "120+ enrolled",
//     rating: "4.8",
//     price: "₹40,000",
//     originalPrice: "₹55,000",
//     features: [
//       "Flutter & Dart",
//       "React Native",
//       "API Integration",
//       "Firebase & Push Notifications",
//       "App Store & Play Store Deployment",
//       "UI/UX for Mobile Apps",
//       "Offline-first Apps",
//       "Capstone Mobile Project",
//     ],
//     level: "Beginner to Intermediate",
//     color: "from-green-500 to-emerald-500",
//     details:
//       "Learn mobile app development from scratch using Flutter & React Native, deploy apps on both iOS and Android.",
//     plan: [
//       { week: "Week 1-2", topic: "Flutter Basics & Widgets" },
//       { week: "Week 3-4", topic: "React Native Essentials" },
//       { week: "Week 5-6", topic: "Backend & API Integration" },
//       { week: "Week 7-8", topic: "Authentication & Firebase" },
//       { week: "Week 9-10", topic: "App Store & Play Store Deployment" },
//     ],
//     roadmap: [
//       "Flutter Development",
//       "React Native Development",
//       "Backend & APIs",
//       "Deployment",
//       "Capstone Mobile Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Flutter Basics" },
//       { month: "Month 2", focus: "React Native Essentials" },
//       { month: "Month 3", focus: "APIs & Firebase" },
//       { month: "Month 4", focus: "Deployment" },
//       { month: "Month 5", focus: "Capstone Project" },
//     ],
//   },
//   {
//     slug: "data-science-ai",
//     title: "Data Science & AI",
//     description: "Dive into data science, machine learning, and artificial intelligence.",
//     duration: "7 months",
//     students: "200+ enrolled",
//     rating: "4.9",
//     price: "₹50,000",
//     originalPrice: "₹70,000",
//     features: [
//       "Python for Data Science",
//       "Statistics & Probability",
//       "Machine Learning",
//       "Deep Learning with TensorFlow & PyTorch",
//       "NLP & Computer Vision",
//       "Big Data Tools",
//       "AI Deployment",
//       "Industry Projects",
//     ],
//     level: "Intermediate to Advanced",
//     color: "from-purple-500 to-pink-500",
//     details:
//       "Gain in-depth knowledge of Data Science and AI, with hands-on projects and model deployment.",
//     plan: [
//       { week: "Week 1-2", topic: "Python & Statistics" },
//       { week: "Week 3-4", topic: "Data Analysis & Visualization" },
//       { week: "Week 5-6", topic: "Machine Learning Basics" },
//       { week: "Week 7-8", topic: "Deep Learning" },
//       { week: "Week 9-10", topic: "NLP & Computer Vision" },
//       { week: "Week 11-12", topic: "Big Data & Cloud AI" },
//     ],
//     roadmap: [
//       "Data Science Fundamentals",
//       "Machine Learning",
//       "Deep Learning",
//       "NLP & CV",
//       "Deployment",
//       "Capstone AI Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Python & Statistics" },
//       { month: "Month 2", focus: "Data Analysis" },
//       { month: "Month 3", focus: "ML Models" },
//       { month: "Month 4", focus: "Deep Learning" },
//       { month: "Month 5", focus: "NLP & CV" },
//       { month: "Month 6", focus: "Big Data Tools" },
//       { month: "Month 7", focus: "Capstone Project" },
//     ],
//   },
 
//  {
//     slug: "devops-cloud-computing",
//     title: "DevOps & Cloud Computing",
//     description: "Master CI/CD, Docker, Kubernetes, and Cloud platforms like AWS & Azure.",
//     duration: "6 months",
//     students: "100+ enrolled",
//     rating: "4.8",
//     price: "₹48,000",
//     originalPrice: "₹65,000",
//     features: [
//       "Linux & Shell Scripting",
//       "Docker & Kubernetes",
//       "CI/CD with Jenkins & GitHub Actions",
//       "AWS, Azure & GCP",
//       "Terraform & Infrastructure as Code",
//       "Monitoring & Logging",
//       "Microservices Deployment",
//       "Capstone Cloud Project",
//     ],
//     level: "Intermediate",
//     color: "from-indigo-500 to-sky-500",
//     details: "Learn modern DevOps practices with hands-on cloud deployment and automation.",
//     plan: [
//       { week: "Week 1-2", topic: "Linux Basics & Networking" },
//       { week: "Week 3-4", topic: "Git, CI/CD Pipelines" },
//       { week: "Week 5-6", topic: "Docker & Kubernetes" },
//       { week: "Week 7-8", topic: "AWS & Cloud Fundamentals" },
//       { week: "Week 9-10", topic: "Terraform & IaC" },
//       { week: "Week 11-12", topic: "Monitoring & Logging" },
//     ],
//     roadmap: [
//       "Linux & Basics",
//       "CI/CD",
//       "Containerization",
//       "Cloud Platforms",
//       "IaC",
//       "Capstone Cloud Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Linux & CI/CD" },
//       { month: "Month 2", focus: "Docker & Kubernetes" },
//       { month: "Month 3", focus: "AWS & Azure" },
//       { month: "Month 4", focus: "Terraform" },
//       { month: "Month 5", focus: "Monitoring" },
//       { month: "Month 6", focus: "Capstone Deployment" },
//     ],
//   },
//   {
//     slug: "cybersecurity-ethical-hacking",
//     title: "Cybersecurity & Ethical Hacking",
//     description: "Protect systems, perform penetration testing, and become a cybersecurity expert.",
//     duration: "5 months",
//     students: "90+ enrolled",
//     rating: "4.7",
//     price: "₹42,000",
//     originalPrice: "₹58,000",
//     features: [
//       "Networking & Security Basics",
//       "Kali Linux & Tools",
//       "Penetration Testing",
//       "Web App Security",
//       "Wi-Fi & Network Attacks",
//       "Incident Response",
//       "Bug Bounty Hunting",
//       "Capstone Security Project",
//     ],
//     level: "Intermediate",
//     color: "from-red-500 to-orange-500",
//     details: "Learn to secure systems, discover vulnerabilities, and perform ethical hacking.",
//     plan: [
//       { week: "Week 1-2", topic: "Networking & Security Basics" },
//       { week: "Week 3-4", topic: "Linux & Ethical Hacking Tools" },
//       { week: "Week 5-6", topic: "Web & Network Security" },
//       { week: "Week 7-8", topic: "Penetration Testing" },
//       { week: "Week 9-10", topic: "Incident Response & Bug Bounty" },
//     ],
//     roadmap: [
//       "Security Fundamentals",
//       "Pentesting",
//       "Network Attacks",
//       "Web Security",
//       "Bug Bounty",
//       "Capstone Security Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Networking & Linux" },
//       { month: "Month 2", focus: "Pentesting Tools" },
//       { month: "Month 3", focus: "Web Security" },
//       { month: "Month 4", focus: "Incident Handling" },
//       { month: "Month 5", focus: "Capstone Project" },
//     ],
//   },
//   {
//     slug: "ui-ux-design-mastery",
//     title: "UI/UX Design Mastery",
//     description: "Design stunning user interfaces and craft seamless user experiences.",
//     duration: "4 months",
//     students: "130+ enrolled",
//     rating: "4.9",
//     price: "₹38,000",
//     originalPrice: "₹50,000",
//     features: [
//       "Design Thinking",
//       "Wireframing & Prototyping",
//       "Figma & Adobe XD",
//       "User Research",
//       "Accessibility & Usability",
//       "Design Systems",
//       "Portfolio Development",
//       "Capstone UX Project",
//     ],
//     level: "Beginner to Intermediate",
//     color: "from-pink-500 to-rose-500",
//     details: "Learn the art of UI/UX design with real-world projects and modern tools.",
//     plan: [
//       { week: "Week 1-2", topic: "Design Thinking & Research" },
//       { week: "Week 3-4", topic: "Wireframing & Figma Basics" },
//       { week: "Week 5-6", topic: "Prototyping & User Testing" },
//       { week: "Week 7-8", topic: "Design Systems & Case Studies" },
//     ],
//     roadmap: [
//       "Design Principles",
//       "Wireframes",
//       "Prototypes",
//       "Usability",
//       "Portfolio",
//       "Capstone UX Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Research & Wireframes" },
//       { month: "Month 2", focus: "Prototyping" },
//       { month: "Month 3", focus: "User Testing" },
//       { month: "Month 4", focus: "Portfolio Project" },
//     ],
//   },
//   {
//     slug: "blockchain-development",
//     title: "Blockchain Development",
//     description: "Learn to build decentralized apps, smart contracts, and blockchain systems.",
//     duration: "6 months",
//     students: "80+ enrolled",
//     rating: "4.7",
//     price: "₹46,000",
//     originalPrice: "₹65,000",
//     features: [
//       "Blockchain Basics",
//       "Ethereum & Smart Contracts",
//       "Solidity Programming",
//       "Decentralized Apps (dApps)",
//       "Web3.js & Ethers.js",
//       "NFTs & DeFi",
//       "Blockchain Security",
//       "Capstone Blockchain Project",
//     ],
//     level: "Intermediate",
//     color: "from-yellow-500 to-amber-500",
//     details: "Hands-on training in building smart contracts, dApps, and blockchain solutions.",
//     plan: [
//       { week: "Week 1-2", topic: "Blockchain Basics & Ethereum" },
//       { week: "Week 3-4", topic: "Solidity & Smart Contracts" },
//       { week: "Week 5-6", topic: "dApps Development" },
//       { week: "Week 7-8", topic: "NFTs & DeFi" },
//       { week: "Week 9-10", topic: "Blockchain Security" },
//     ],
//     roadmap: [
//       "Blockchain Basics",
//       "Smart Contracts",
//       "dApps",
//       "NFTs",
//       "Security",
//       "Capstone Blockchain Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Blockchain Fundamentals" },
//       { month: "Month 2", focus: "Smart Contracts" },
//       { month: "Month 3", focus: "dApps Development" },
//       { month: "Month 4", focus: "NFTs & DeFi" },
//       { month: "Month 5", focus: "Security & Capstone" },
//       { month: "Month 6", focus: "Final Project" },
//     ],
//   },
//   {
//     slug: "ai-powered-chatbots",
//     title: "AI-Powered Chatbots",
//     description: "Create AI-driven chatbots with NLP, Dialogflow, and GPT-based models.",
//     duration: "3 months",
//     students: "110+ enrolled",
//     rating: "4.8",
//     price: "₹32,000",
//     originalPrice: "₹45,000",
//     features: [
//       "NLP Basics",
//       "Dialogflow & Rasa",
//       "GPT & LLMs",
//       "API Integration",
//       "Voice Bots",
//       "Chatbot Deployment",
//       "Analytics & Monitoring",
//       "Capstone Chatbot Project",
//     ],
//     level: "Beginner to Intermediate",
//     color: "from-teal-500 to-green-500",
//     details: "Learn to build intelligent chatbots for business automation and customer support.",
//     plan: [
//       { week: "Week 1", topic: "NLP Basics & Tools" },
//       { week: "Week 2", topic: "Dialogflow & Rasa" },
//       { week: "Week 3-4", topic: "LLMs & GPT Models" },
//       { week: "Week 5-6", topic: "API & Voice Bots" },
//       { week: "Week 7-8", topic: "Deployment & Analytics" },
//     ],
//     roadmap: [
//       "NLP Basics",
//       "Dialogflow",
//       "LLMs",
//       "Integration",
//       "Deployment",
//       "Capstone Chatbot Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "NLP & Dialogflow" },
//       { month: "Month 2", focus: "LLMs & API" },
//       { month: "Month 3", focus: "Deployment & Capstone" },
//     ],
//   },
//   {
//     slug: "game-development",
//     title: "Game Development",
//     description: "Design and develop games with Unity and Unreal Engine.",
//     duration: "5 months",
//     students: "95+ enrolled",
//     rating: "4.8",
//     price: "₹44,000",
//     originalPrice: "₹60,000",
//     features: [
//       "Unity Basics",
//       "Unreal Engine",
//       "Game Physics",
//       "Multiplayer Games",
//       "AR & VR Basics",
//       "3D Modeling",
//       "Game Monetization",
//       "Capstone Game Project",
//     ],
//     level: "Beginner to Intermediate",
//     color: "from-gray-500 to-slate-500",
//     details: "Build real-world games using industry-standard tools and engines.",
//     plan: [
//       { week: "Week 1-2", topic: "Unity Basics" },
//       { week: "Week 3-4", topic: "Unreal Engine Fundamentals" },
//       { week: "Week 5-6", topic: "Game Physics & AI" },
//       { week: "Week 7-8", topic: "Multiplayer Games" },
//       { week: "Week 9-10", topic: "AR/VR & Monetization" },
//     ],
//     roadmap: [
//       "Unity",
//       "Unreal Engine",
//       "Physics & AI",
//       "Multiplayer",
//       "AR/VR",
//       "Capstone Game Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Unity Basics" },
//       { month: "Month 2", focus: "Unreal Engine" },
//       { month: "Month 3", focus: "Game Physics" },
//       { month: "Month 4", focus: "Multiplayer & AR/VR" },
//       { month: "Month 5", focus: "Final Game Project" },
//     ],
//   },
//   {
//     slug: "cloud-ai-engineering",
//     title: "Cloud AI Engineering",
//     description: "Combine AI with cloud to deploy scalable intelligent solutions.",
//     duration: "6 months",
//     students: "75+ enrolled",
//     rating: "4.9",
//     price: "₹52,000",
//     originalPrice: "₹70,000",
//     features: [
//       "Cloud Fundamentals",
//       "AI/ML on AWS, Azure, GCP",
//       "Data Pipelines",
//       "MLOps & Deployment",
//       "Kubernetes for AI",
//       "Monitoring AI Systems",
//       "Real-time Inference",
//       "Capstone Cloud AI Project",
//     ],
//     level: "Advanced",
//     color: "from-cyan-500 to-blue-600",
//     details: "Specialize in deploying AI applications on cloud with MLOps best practices.",
//     plan: [
//       { week: "Week 1-2", topic: "Cloud Fundamentals" },
//       { week: "Week 3-4", topic: "AI/ML on AWS & Azure" },
//       { week: "Week 5-6", topic: "Data Pipelines & Storage" },
//       { week: "Week 7-8", topic: "MLOps Practices" },
//       { week: "Week 9-10", topic: "Kubernetes for AI" },
//       { week: "Week 11-12", topic: "Monitoring & Scaling" },
//     ],
//     roadmap: [
//       "Cloud Basics",
//       "AI/ML on Cloud",
//       "MLOps",
//       "Kubernetes",
//       "Scaling",
//       "Capstone Cloud AI Project",
//     ],
//     timeline: [
//       { month: "Month 1", focus: "Cloud Basics" },
//       { month: "Month 2", focus: "AI/ML on Cloud" },
//       { month: "Month 3", focus: "Data Pipelines" },
//       { month: "Month 4", focus: "MLOps" },
//       { month: "Month 5", focus: "Kubernetes" },
//       { month: "Month 6", focus: "Final AI Deployment" },
//     ],
//   },
// ]


// export default function CourseDetailsPage() {
//   const params = useParams()
//   const course = courses.find((c) => c.slug === params.slug)
//   const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

//   if (!course) {
//     return (
//       <div className="max-w-4xl mx-auto py-20 px-6 text-center">
//         <h2 className="text-2xl font-bold">Course not found</h2>
//         <p className="text-muted-foreground mt-2">
//           Please check the course link or go back to courses.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <>
//       <section className="py-16 bg-gray-50 dark:bg-gray-900">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
//           {/* Main Content */}
//           <div className="md:col-span-2">
//             <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
//               {course.title}
//             </h1>
//             <p className="text-xl text-muted-foreground mb-6">
//               {course.description}
//             </p>

//             {/* Stats */}
//             <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-10">
//               <div className="flex items-center gap-1">
//                 <Clock className="h-4 w-4 text-blue-500" />
//                 <span className="font-medium">{course.duration}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Users className="h-4 w-4 text-green-500" />
//                 <span className="font-medium">{course.students}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 <span className="font-medium">{course.rating}</span>
//               </div>
//             </div>

//             <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
//               {course.details}
//             </p>

//             {/* What you'll learn */}
//             <Card className="bg-white dark:bg-gray-800 shadow-xl border-t-4 border-t-primary rounded-lg mb-10">
//               <CardContent className="p-8">
//                 <h3 className="text-2xl font-bold mb-6">What you'll learn</h3>
//                 <div className="grid sm:grid-cols-2 gap-4">
//                   {course.features.map((feature, idx) => (
//                     <div key={idx} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
//                       <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
//                       {feature}
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Roadmap */}
//             <div className="mb-10">
//               <h3 className="text-2xl font-bold mb-6">Learning Roadmap</h3>
//               <div className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-0 before:absolute before:left-3 md:before:left-0 md:before:top-1/2 before:w-px md:before:w-full md:before:h-px before:bg-gray-300 before:-z-10">
//                 {course.roadmap.map((step, idx) => (
//                   <div key={idx} className="flex-1 flex items-center gap-4 md:flex-col md:items-center md:text-center">
//                     <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0 z-10">
//                       {idx + 1}
//                     </div>
//                     <span className="text-base font-medium mt-1 md:mt-3">{step}</span>
//                     {idx < course.roadmap.length - 1 && (
//                       <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gray-300"></div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="md:col-span-1">
//             <Card className="bg-white dark:bg-gray-800 sticky top-10 shadow-xl rounded-lg p-6">
//               <div className="flex flex-col gap-4 mb-6">
//                 <div className="text-4xl font-extrabold text-primary">
//                   {course.price}
//                 </div>
//                 <div className="text-sm text-muted-foreground line-through">
//                   {course.originalPrice}
//                 </div>
//                 <Badge variant="secondary" className="w-fit">
//                   {course.level}
//                 </Badge>
//               </div>

//               <Button
//                 size="lg"
//                 className="w-full text-lg font-bold gradient-primary py-3"
//                 onClick={() => setIsEnrollmentOpen(true)}
//               >
//                 Enroll Now
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Button>

//               <hr className="my-6 border-gray-200 dark:border-gray-700" />

//               <h4 className="text-lg font-semibold mb-4">Course Timeline</h4>
//               <ul className="space-y-3">
//                 {course.timeline.map((t, idx) => (
//                   <li key={idx} className="flex items-center gap-3 text-sm">
//                     <Badge variant="outline" className="w-24 justify-center">
//                       {t.month}
//                     </Badge>
//                     <span className="text-gray-700 dark:text-gray-300">{t.focus}</span>
//                   </li>
//                 ))}
//               </ul>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <EnrollmentModal
//         isOpen={isEnrollmentOpen}
//         onClose={() => setIsEnrollmentOpen(false)}
//         course={course}
//       />
//     </>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, Star, ArrowRight, CheckCircle } from "lucide-react"
import { EnrollmentModal } from "@/components/enrollment-modal"
import { useAuth} from "@/components/auth-provider"

interface Course {
  _id: string
  title: string
  slug: string
  description: string
  duration: string
  students: any[]
  rating: number
  price: number
  originalPrice: number
  features: string[]
  level: string
  color?: string
  details?: string
  roadmap?: string[]
  timeline?: { month: string; focus: string }[]
}

export default function CourseDetailsPage() {
  const params = useParams()
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${params.slug}`)
        if (!res.ok) throw new Error("Course not found")
        const data = await res.json()
        setCourse(data)
      } catch (err) {
        console.error(err)
        setCourse(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [params.slug])


  const { user } = useAuth()

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!course) return <div className="text-center py-20">Course not found</div>

  return (
    <>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">{course.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{course.description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-10">
              <div className="flex items-center gap-1"><Clock className="h-4 w-4 text-blue-500" />{course.duration}</div>
              <div className="flex items-center gap-1"><Users className="h-4 w-4 text-green-500" />  {course.students ? course.students.length : 0} enrolled</div>
              <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{course.rating}</div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{course.details}</p>

            <Card className="bg-white dark:bg-gray-800 shadow-xl border-t-4 border-t-primary rounded-lg mb-10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />{feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6">Learning Roadmap</h3>
              <div className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-0 before:absolute before:left-3 md:before:left-0 md:before:top-1/2 before:w-px md:before:w-full md:before:h-px before:bg-gray-300 before:-z-10">
                {course.roadmap?.map((step, idx) => (
                  <div key={idx} className="flex-1 flex items-center gap-4 md:flex-col md:items-center md:text-center">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg flex-shrink-0 z-10">{idx + 1}</div>
                    <span className="text-base font-medium mt-1 md:mt-3">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="bg-white dark:bg-gray-800 sticky top-10 shadow-xl rounded-lg p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="text-4xl font-extrabold text-primary">₹{course.price}</div>
                <div className="text-sm text-muted-foreground line-through">₹{course.originalPrice}</div>
                <Badge variant="secondary" className="w-fit">{course.level}</Badge>
              </div>

             { user ? (<Button size="lg" className="w-full text-lg font-bold gradient-primary py-3" onClick={() => setIsEnrollmentOpen(true)}>
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>) : (
                <Button size="lg" className="w-full text-lg font-bold gradient-primary py-3" disabled>
                Please login to enroll
              </Button>
             ) }

              <hr className="my-6 border-gray-200 dark:border-gray-700" />

              <h4 className="text-lg font-semibold mb-4">Course Timeline</h4>
              <ul className="space-y-3">
                {course.timeline?.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Badge variant="outline" className="w-24 justify-center">{t.month}</Badge>
                    <span className="text-gray-700 dark:text-gray-300">{t.focus}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <EnrollmentModal isOpen={isEnrollmentOpen} onClose={() => setIsEnrollmentOpen(false)} course={course} />
    </>
  )
}


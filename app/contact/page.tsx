
"use client";

import {Footer}  from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  Clock,
  MessageCircle,
  Users,
  Award,
  HeadphonesIcon,
  DollarSign, 
  Calendar,
  Zap, // Used to replace MapPin, emphasizing speed/digital access
} from "lucide-react";
import { ModernNavigation } from "@/components/modern-navigation";
import { QuickAction } from "@/components/quick-action";


// --- UPDATED CONTACT INFO for General Course Platform ---
const contactInfo = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email Support",
    description: "Questions about enrollment or course content?",
    contact: "support@upcoders.vercel.app", 
    action: "mailto:support@upcoders.vercel.app",
    badge: "24-Hour Reply",
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "Enrollment & Pricing",
    description: "Get assistance with course purchase and payment.",
    contact: "+91 98765 43210", 
    action: "tel:+919876543210",
    badge: "Instant Help",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />, // Changed from MapPin to Zap (Digital Focus)
    title: "Technical Access", 
    description: "Issues accessing your student dashboard or videos/PDF's.",
    contact: "Submit a Ticket",
    action: "#", 
    badge: "Fast Resolution",
  },
];

// --- MODIFIED OFFICE HOURS (Support Availability) ---
const officeHours = [
  {
    day: "Chat & Email",
    hours: "9:00 AM - 10:00 PM IST",
    type: "Dedicated Support",
  },
  { day: "Instructor Help", hours: "Check Program Schedule", type: "Live Q&A Sessions" },
  { day: "Weekend Support", hours: "10:00 AM - 6:00 PM IST", type: "Enrollment Assistance" },
];

// --- MODIFIED FAQs TO REFLECT COURSE PLATFORM ---
const faqs = [
  {
    question: "How do I access my course content after enrolling?",
    answer:
      "Immediately after successful purchase, you will receive a confirmation email with a link to the dedicated Upcoder student dashboard. Your course content, lecture videos, and assignments will be available there. You can log in using the credentials created during checkout.",
  },
  {
    question: "Are your courses live or pre-recorded?",
    answer:
      "Most of our courses are delivered as **high-quality, on-demand video content** for maximum flexibility. This allows you to learn at your own pace. Larger programs often include live Q&A sessions or mentorship calls. Check the specific course page for details!",
  },
  {
    question: "What is the refund policy for Upcoder courses?",
answer: "All sales on Upcoder courses are final. We do not offer refunds for any course or program."
  },
  {
    question: "Do I receive a certificate upon course completion?",
    answer:
      "Yes, upon completing all modules and final projects, a verified **Certificate of Completion** will be generated and made available for download in your student dashboard. This certificate is valuable for showcasing your new skills.",
  },
  {
    question: "What prior knowledge is required for enrollment?",
    answer:
      "Our courses are clearly labeled by level: Beginner, Intermediate, and Advanced. You can find detailed prerequisites listed on the sales page for each course. For most beginner courses, no prior coding experience is required.",
  },
  {
    question: "Can I get help from instructors during the course?",
    answer:
      "Yes, all courses include access to our private community channels (Discord/Telegram) where instructors and TAs actively answer questions. Larger programs also include dedicated weekly live Q&A sessions.",
  },
];

const contactStats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    number: "500+", 
    label: "Active Learners",
    description: "Students enrolled across all our programs",
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 text-primary" />,
    title: "< 30 mins", 
    label: "Support Response Time",
    description: "Quick help for access or technical issues",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    number: "4.8/5",
    label: "Course Rating", 
    description: "Based on verified student reviews",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Background styles omitted for brevity */}

          <div className="max-w-7xl mx-auto text-center relative">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Technical & Enrollment Support
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Contact{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Upcoder Support
              </span>
              </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Whether you need assistance with purchasing, accessing, or completing a course, our team is here to ensure your learning journey is seamless.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
              {contactStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {stat.number || stat.title}
                  </div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <Badge className="absolute top-4 right-4 text-xs">
                    {info.badge}
                  </Badge>

                  <CardHeader>
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      {info.icon}
                    </div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80"
                      asChild
                    >
                      <a href={info.action}>{info.contact}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Send Us a Quick Message</h2>
                <p className="text-muted-foreground mb-6">Describe your issue or question regarding a course purchase or access.</p>
                <ContactForm />
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">Support & Q&A Schedule</CardTitle>
                    </div>
                    <CardDescription>
                      Availability for direct chat, phone support, and live sessions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {officeHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <div className="font-medium">{schedule.day}</div>
                            <div className="text-sm text-muted-foreground">
                              {schedule.type}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{schedule.hours}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <QuickAction />

                {/* Community Connection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Connect with the Learner Community</CardTitle>
                    <CardDescription>
                      Join our private Discord or Telegram group for peer support, networking, and direct help.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center z-10">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground font-medium">
                          Upcoder Learner Network
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Ask questions, share projects, and find collaborators.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
                        >
                          Join Community
                        </Button>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">
                Course Enrollment FAQs
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Quick answers about purchasing, accessing, and learning from our programs.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <Card className="p-8">
                <CardContent className="space-y-4">
                  <h3 className="text-2xl font-bold">Ready to Start Your Learning Journey?</h3>
                  <p className="text-muted-foreground">
                    Explore our full catalog of high-impact programming and design courses today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="/courses"  rel="noopener noreferrer"> 
                      <Button size="lg">
                        <Calendar className="mr-2 h-4 w-4" />
                        See All Courses
                      </Button>
                    </a>

                    <a href="/courses"  rel="noopener noreferrer"> 
                      <Button
                        size="lg"
                        variant="outline"
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        Start Git Course (₹29)
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}







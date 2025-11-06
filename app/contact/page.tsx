"use client";

import { Footer } from "@/components/footer";
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
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  Users,
  Award,
  HeadphonesIcon,
} from "lucide-react";
import { ModernNavigation } from "@/components/modern-navigation";
import { QuickAction } from "@/components/quick-action";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    title: "Email Us",
    description: "Get detailed responses to your queries",
    contact: "admissions@Upcoder.com",
    action: "mailto:admissions@Upcoder.com",
    badge: "24/7 Support",
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    title: "Call Us",
    description: "Speak directly with our counselors",
    contact: "+91 98765 43210",
    action: "tel:+919876543210",
    badge: "Instant Help",
  },
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    title: "Visit Our Campus",
    description: "Experience our world-class facilities",
    contact: "Bhopal, MP, India",
    action: "#",
    badge: "Campus Tour",
  },
];

const officeHours = [
  {
    day: "Monday - Friday",
    hours: "8:00 AM - 8:00 PM",
    type: "Regular Classes",
  },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM", type: "Weekend Batches" },
  { day: "Sunday", hours: "10:00 AM - 4:00 PM", type: "Counseling Only" },
];

const faqs = [
  {
    question: "What are the admission requirements for your courses?",
    answer:
      "Our admission requirements vary by program. Generally, we accept students from 10+2 onwards for most courses. We conduct an aptitude test and counseling session to determine the best program fit for each student. No prior coding experience is required for beginner courses.",
  },
  {
    question: "Do you provide placement assistance after course completion?",
    answer:
      "Yes, we have a dedicated placement cell with partnerships with 200+ companies. We provide 100% placement assistance including resume building, interview preparation, mock interviews, and direct company connections. Our placement rate is 98% with average salary packages ranging from 4-15 LPA.",
  },
  {
    question: "What is your teaching methodology?",
    answer:
      "We follow a hybrid learning approach combining live interactive classes, hands-on projects, peer learning, and one-on-one mentorship. Our curriculum is industry-aligned and updated regularly. We also provide recorded sessions, practice assignments, and 24/7 doubt resolution support.",
  },
  {
    question: "Do you offer flexible batch timings?",
    answer:
      "Yes, we offer multiple batch timings including morning (9 AM - 12 PM), afternoon (2 PM - 5 PM), evening (6 PM - 9 PM), and weekend batches. We also have fast-track intensive courses and part-time options for working professionals.",
  },
  {
    question: "What kind of certification do you provide?",
    answer:
      "We provide industry-recognized certificates upon course completion. Our certifications are valued by top companies and we're ISO 9001:2015 certified. We also help students prepare for additional industry certifications like AWS, Google Cloud, and Microsoft Azure.",
  },
  {
    question: "Do you offer online classes?",
    answer:
      "Yes, we offer both online and offline classes. Our online platform provides live interactive sessions, recorded lectures, virtual labs, and real-time doubt resolution. Students can choose between classroom, online, or hybrid learning modes based on their preference.",
  },
];

const contactStats = [
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    number: "500+",
    label: "Daily Inquiries",
    description: "Students reach out to us every day",
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 text-primary" />,
    title: "< 2 mins",
    label: "Average Response Time",
    description: "Quick support when you need it",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    number: "4.9/5",
    label: "Student Satisfaction",
    description: "Based on 10,000+ reviews",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ModernNavigation />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto text-center relative">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Available 24/7 for Student Support
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
              Contact{" "}
              <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Upcoder
              </span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
              Ready to start your learning journey? Get in touch with our expert
              counselors who will guide you to the perfect course that matches
              your career goals and aspirations.
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
                <ContactForm />
              </div>

              {/* Additional Information */}
              <div className="space-y-8">
                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Clock className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">Campus Hours</CardTitle>
                    </div>
                    <CardDescription>
                      Our campus and support team availability
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

                {/* Quick Actions */}

                <QuickAction />

                {/* Location Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Visit Our Campus</CardTitle>
                    <CardDescription>
                      Experience our state-of-the-art facilities and learning
                      environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                      <div className="text-center z-10">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground font-medium">
                          Interactive Campus Map
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bhopal, MP, India
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
                        >
                          Get Directions
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
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground text-balance">
                Get answers to common questions about our courses, admissions,
                and career support.
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
                  <h3 className="text-2xl font-bold">Still Have Questions?</h3>
                  <p className="text-muted-foreground">
                    Our expert counselors are here to help you make the right
                    choice for your career.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+911234567890">
                      {/*  Replace with actual phone number */}
                      <Button size="lg">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </a>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => {
                        toast.success("Feature coming soon!");
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Consultation
                    </Button>
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

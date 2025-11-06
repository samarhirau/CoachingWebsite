"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Phone, Mail, Clock, } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { QuickAction } from "@/components/quick-action"

export function ContactSection() {

  

 

  const faqs = [
    {
      question: "What are the prerequisites for joining?",
      answer:
        "No prior programming experience is required for our beginner courses. For advanced courses, basic programming knowledge is recommended.",
    },
    {
      question: "Do you provide job placement assistance?",
      answer:
        "Yes, we have a 95% placement rate with our dedicated placement team that helps with resume building, interview preparation, and connecting with hiring partners.",
    },
    {
      question: "What is the class schedule?",
      answer:
        "We offer flexible schedules including weekday evenings (7-9 PM) and weekend batches (10 AM-4 PM). Online and offline options are available.",
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 7-day money-back guarantee. If you're not satisfied within the first week, you can get a full refund.",
    },
    {
      question: "Do you provide certificates?",
      answer:
        "Yes, you'll receive an industry-recognized certificate upon successful completion of the course, along with project portfolio.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your <span className="text-gradient">Coding Journey?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? Want to know more about our courses? We're here to help you make the right choice for your
            career.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
     <div className="lg:col-span-2">
        < ContactForm />
     </div>

     

          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      123 Tech Hub, Sector 62
                      <br />
                      Noida, UP 201301
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">+91-98927 62728</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">support@Upcoder.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Office Hours</div>
                    <div className="text-sm text-muted-foreground">
                      Mon-Fri: 9 AM - 7 PM
                      <br />
                      Sat: 10 AM - 4 PM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <QuickAction />
          
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-muted-foreground">Find answers to common questions about our courses and programs</p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

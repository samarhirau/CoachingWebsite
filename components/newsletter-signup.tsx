
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, CheckCircle, Gift, TrendingUp, Users } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<null | "subscribed" | "already">(
    null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newslatter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe")
      }

      if (data.message === "You are already subscribed!") {
        setSubscriptionStatus("already")
      } else {
        setSubscriptionStatus("subscribed")
      }

      setEmail("")
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

   const benefits = [
    { icon: Gift, text: "Exclusive course discounts starting ₹29" },
    { icon: TrendingUp, text: "Coding tips & industry insights" },
    { icon: Users, text: "Access to Upcoder community events" },
  ]

  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-1">
            <div className="bg-background rounded-lg">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Join the <span className="text-gradient">Upcoder Newsletter</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Stay updated with coding tips, career advice, and exclusive offers on our ₹29 beginner-friendly courses.
                  </p>
                </div>

                {!subscriptionStatus ? (
                  <>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                      <div className="flex gap-3">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="flex-1"
                          required
                        />
                        <Button type="submit" className="gradient-primary px-6" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          ) : (
                            "Subscribe"
                          )}
                        </Button>
                      </div>
                    </form>

                    <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                      {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <benefit.icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium">{benefit.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-6">
                      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">No spam, ever</Badge>
                        <Badge variant="outline" className="text-xs">Unsubscribe anytime</Badge>
                        <Badge variant="outline" className="text-xs">Weekly updates</Badge>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {subscriptionStatus === "subscribed"
                        ? "Welcome to Upcoder!"
                        : "You're already subscribed!"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {subscriptionStatus === "subscribed"
                        ? "You've successfully subscribed to our newsletter. Check your email for a welcome message."
                        : "You are already in our subscriber list. No need to subscribe again."}
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      {subscriptionStatus === "subscribed"
                        ? "Subscription confirmed"
                        : "Already subscribed"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}


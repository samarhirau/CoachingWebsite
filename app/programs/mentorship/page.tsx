"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Handshake, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function MentorshipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
    paymentPlan: "",
    coupon: "",
    agreeTerms: false,
  });

  const mentors = [
    {
      name: "Dr. Evelyn Reed",
      title: "Senior AI Researcher",
      bio: "With over 15 years in the field, Dr. Reed specializes in machine learning ethics and advanced neural networks. She is a published author and a leading voice in responsible AI.",
      image: "https://placehold.co/100x100/A5B4FC/4338CA?text=ER",
    },
    {
      name: "Mark Jensen",
      title: "Lead Software Architect",
      bio: "Mark has designed scalable systems for several Fortune 500 companies. He mentors on cloud-native architecture, microservices, and high-performance computing.",
      image: "https://placehold.co/100x100/FDBA74/9A3412?text=MJ",
    },
    {
      name: "Sarah Chen",
      title: "Product Management Director",
      bio: "Sarah has a decade of experience launching successful tech products from ideation to market. She provides guidance on product strategy, user discovery, and team leadership.",
      image: "https://placehold.co/100x100/93C5FD/1D4ED8?text=SC",
    },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrevious = () => step > 1 && setStep(step - 1);
  const handleSubmit = () => {
    console.log("Enrollment submitted:", formData);
    setIsModalOpen(false);
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      goals: "",
      paymentPlan: "",
      coupon: "",
      agreeTerms: false,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Back Button */}
      <div className="py-5 px-4 max-w-7xl mx-auto">
        <Button asChild variant="ghost" className="-ml-4">
          <a href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-white   text-gray-900">
     <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="relative max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Elevate Your Career with <span className="text-primary">1-on-1 Mentorship</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized guidance from industry leaders who are dedicated to your success. Our program is tailored to your unique goals.
          </p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-8 py-3 rounded-full text-lg font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white text-gray-900 border border-gray-200">
              Get Started Today
            </Button>
          </div>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Mentorship Program?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Roadmap</h3>
              <p className="text-gray-600">
                We create a custom learning plan based on your skills and career aspirations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="p-4 bg-green-100 rounded-full mb-4">
                <Handshake className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert-Led Sessions</h3>
              <p className="text-gray-600">
                Connect directly with seasoned professionals who are experts in their fields.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="p-4 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="h-12 w-12 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tangible Career Growth</h3>
              <p className="text-gray-600">
                Gain the skills and confidence to achieve your career goals and stand out in the job market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="py-20 px-4 bg-gray-100 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Your Mentors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                <p className="text-sm font-medium text-blue-600">{mentor.title}</p>
                <p className="mt-4 text-sm text-gray-600">{mentor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 text-center bg-white rounded-t-3xl shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Ready to Take the Next Step?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Sign up today to start your personalized mentorship journey and unlock your full potential.
          </p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105">
              Enroll Now
            </Button>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Enroll in 1-on-1 Mentorship</DialogTitle>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {step > num ? <CheckCircle className="h-4 w-4" /> : num}
                </div>
                {num < 3 && <div className={`w-16 h-1 mx-2 ${step > num ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="Enter your phone number" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Goals & Coupon */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Your Goals</Label>
                <Textarea value={formData.goals} onChange={(e) => handleInputChange("goals", e.target.value)} placeholder="Tell us about your goals..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Coupon Code (Optional)</Label>
                <Input value={formData.coupon} onChange={(e) => handleInputChange("coupon", e.target.value)} placeholder="Enter coupon code" />
              </div>
            </div>
          )}

       {/* Step 3: Payment & Terms */}
{step === 3 && (
  <div className="space-y-6">
    <div className="space-y-4">
      <Label>Payment Plan</Label>
      <div className="grid gap-3">
        <Button
          onClick={() => handleInputChange("paymentPlan", "full")}
          variant={formData.paymentPlan === "full" ? "default" : "outline"}
        >
          Pay in Full
        </Button>
        <Button
          onClick={() => handleInputChange("paymentPlan", "installment")}
          variant={formData.paymentPlan === "installment" ? "default" : "outline"}
        >
          2 Monthly Installments
        </Button>
      </div>

      {/* Payment Amount Display */}
      <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Total Payment Amount:</p>
        <p className="text-2xl font-bold text-primary">
          {formData.paymentPlan === "full"
            ? formData.coupon === "DISCOUNT10"
              ? "₹40,500" // Example: 10% off
              : "₹45,000"
            : formData.coupon === "DISCOUNT10"
            ? "₹22,500 x 2 (₹45,000 total, 10% off applied)"
            : "₹22,500 x 2 (₹45,000 total)"}
        </p>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox
        checked={formData.agreeTerms}
        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
      />
      <Label className="text-sm">
        I agree to the{" "}
        <a href="#" className="text-primary hover:underline">
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
      </Label>
    </div>
  </div>
)}


          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={step === 1 ? () => setIsModalOpen(false) : handlePrevious}>
              {step === 1 ? "Cancel" : "Previous"}
            </Button>
            <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={step === 3 && !formData.agreeTerms} className="gradient-primary">
              {step === 3 ? "Complete Enrollment" : "Next"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

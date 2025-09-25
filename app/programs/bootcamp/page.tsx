"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, TrendingUp, User, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function BootcampPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goals: "",
    paymentPlan: "",
    agreeTerms: false,
  });

  const instructors = [
    { name: "Anita Kapoor", title: "Full Stack Expert", bio: "Anita has trained over 200 developers and specializes in building scalable web applications.", image: "https://placehold.co/100x100/93C5FD/1D4ED8?text=AK" },
    { name: "Rohan Mehta", title: "Cloud & DevOps Mentor", bio: "Rohan is a certified AWS architect and DevOps engineer mentoring bootcamp participants in cloud technologies.", image: "https://placehold.co/100x100/FDBA74/9A3412?text=RM" },
    { name: "Sneha Iyer", title: "AI & ML Instructor", bio: "Sneha has led multiple AI projects in the industry and mentors students on machine learning and AI pipelines.", image: "https://placehold.co/100x100/A5B4FC/4338CA?text=SI" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrevious = () => step > 1 && setStep(step - 1);
  const handleSubmit = () => {
    console.log("Bootcamp enrollment submitted:", formData);
    setIsModalOpen(false);
    setStep(1);
    setFormData({ name: "", email: "", phone: "", goals: "", paymentPlan: "", agreeTerms: false });
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
      <section className="relative py-20 px-4 text-center">
<div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="relative max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Join Our <span className="bg-clip-text text-gradient">Intensive Bootcamp</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Learn fast, gain hands-on experience, and master in-demand tech skills with our intensive, project-driven bootcamp.
          </p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-8 py-3 rounded-full text-lg font-bold shadow-lg transform transition-transform duration-300 hover:scale-105  text-white border-0">
              Enroll Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Join Our Bootcamp?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <BookOpen className="h-12 w-12 text-blue-500" />, title: "Project-Based Learning", desc: "Build real-world projects and gain practical experience.", bg: "bg-blue-100" },
              { icon: <User className="h-12 w-12 text-green-500" />, title: "Expert Instructors", desc: "Learn directly from industry experts with hands-on mentorship.", bg: "bg-green-100" },
              { icon: <TrendingUp className="h-12 w-12 text-purple-500" />, title: "Career Accelerator", desc: "Boost your skills quickly and prepare for top tech roles.", bg: "bg-purple-100" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className={`p-4 rounded-full mb-4 ${feature.bg}`}>{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 px-4 bg-gray-100 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet the Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((inst, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <img src={inst.image} alt={inst.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm mb-4" />
                <h3 className="text-xl font-bold text-gray-900">{inst.name}</h3>
                <p className="text-sm font-medium text-blue-600">{inst.title}</p>
                <p className="mt-4 text-sm text-gray-600">{inst.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bootcamp Timeline */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Bootcamp Timeline</h2>
          <div className="space-y-6">
            {[
              { week: "Week 1-2", topic: "Frontend Fundamentals (HTML, CSS, JS, React)" },
              { week: "Week 3-4", topic: "Backend & Databases (Node.js, Express, MongoDB)" },
              { week: "Week 5-6", topic: "Advanced Topics & Deployment (AWS, CI/CD, Security)" },
              { week: "Week 7-8", topic: "Capstone Project & Interview Prep" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-500 mt-1" />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{item.week}</h4>
                  <p className="text-gray-600">{item.topic}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center bg-white rounded-t-3xl shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Kickstart Your Bootcamp Journey</h2>
          <p className="mt-4 text-lg text-gray-600">Apply today and transform your career with hands-on intensive training.</p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105  text-white">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Bootcamp Application</DialogTitle>
          </DialogHeader>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= num ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {step > num ? <CheckCircle className="h-4 w-4 text-white" /> : num}
                </div>
                {num < 3 && <div className={`w-16 h-1 mx-2 ${step > num ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-6">
              <Input placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              <Input placeholder="Email Address" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="space-y-6">
              <Textarea placeholder="Your Goals & Expectations" rows={4} value={formData.goals} onChange={(e) => handleInputChange("goals", e.target.value)} />
            </div>
          )}

          {/* Step 3: Payment & Terms */}
          {step === 3 && (
            <div className="space-y-6">
              <Label>Payment Plan</Label>
              <div className="grid gap-3">
                <Button onClick={() => handleInputChange("paymentPlan", "full")} variant={formData.paymentPlan === "full" ? "default" : "outline"}>
                  Full Payment - ₹50,000
                </Button>
                <Button onClick={() => handleInputChange("paymentPlan", "installment")} variant={formData.paymentPlan === "installment" ? "default" : "outline"}>
                  2 Installments - ₹25,000 x 2
                </Button>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox checked={formData.agreeTerms} onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)} />
                <Label>I agree to the <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a></Label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={step === 1 ? () => setIsModalOpen(false) : handlePrevious}>
              {step === 1 ? "Cancel" : "Previous"}
            </Button>
            <Button onClick={step === 3 ? handleSubmit : handleNext} className="bg-primary text-white" disabled={step === 3 && !formData.agreeTerms}>
              {step === 3 ? "Complete Enrollment" : "Next"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

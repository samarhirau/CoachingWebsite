"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Calendar, User, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function InternshipPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    resumeLink: "",
    agreeTerms: false,
  });

  const mentors = [
    { name: "Jane Smith", title: "AI Intern Mentor", bio: "Jane has mentored over 50 interns in AI and Machine Learning projects. She focuses on practical skill-building.", image: "https://placehold.co/100x100/93C5FD/1D4ED8?text=JS" },
    { name: "David Lee", title: "Software Development Mentor", bio: "David guides interns through full-stack development projects, emphasizing clean code and best practices.", image: "https://placehold.co/100x100/FDBA74/9A3412?text=DL" },
    { name: "Priya Sharma", title: "Product Management Mentor", bio: "Priya helps interns learn product strategy, roadmap planning, and teamwork for tech projects.", image: "https://placehold.co/100x100/A5B4FC/4338CA?text=PS" },
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => step < 2 && setStep(step + 1);
  const handlePrevious = () => step > 1 && setStep(step - 1);
  const handleSubmit = () => {
    console.log("Internship enrollment submitted:", formData);
    setIsModalOpen(false);
    setStep(1);
    setFormData({ name: "", email: "", phone: "", skills: "", resumeLink: "", agreeTerms: false });
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
      <section className="relative py-20 px-4 text-center bg-white text-gray-900 ">
     <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="relative max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Join Our <span className="text-gradient">Internship Program</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Gain hands-on experience, learn from industry experts, and accelerate your career through our internship program.
          </p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-8 py-3 rounded-full text-lg font-bold shadow-lg transform transition-transform duration-300 hover:scale-105  text-white border-0">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Join Our Internship Program?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Calendar className="h-12 w-12 text-blue-500" />, title: "Real Projects", desc: "Work on real-world projects and build a strong portfolio.", bg: "bg-blue-100" },
              { icon: <User className="h-12 w-12 text-green-500" />, title: "Expert Mentors", desc: "Learn directly from industry professionals and experienced mentors.", bg: "bg-green-100" },
              { icon: <TrendingUp className="h-12 w-12 text-purple-500" />, title: "Career Growth", desc: "Gain the skills and connections to kickstart your career.", bg: "bg-purple-100" },
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

      {/* Mentors Section */}
      <section className="py-20 px-4 bg-gray-100 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Mentors</h2>
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
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">Ready to Apply?</h2>
          <p className="mt-4 text-lg text-gray-600">Submit your application today and kickstart your internship journey with us.</p>
          <div className="mt-10">
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-transform duration-300 hover:scale-105  text-white border-0">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Enrollment Modal */}
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Internship Application</DialogTitle>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= num ? "bg-primary  text-white" : "bg-muted text-muted-foreground"}`}>
                  {num}
                </div>
                {num < 2 && <div className={`w-16 h-1 mx-2 ${step > num ? "" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Steps */}
          {step === 1 && (
            <div className="space-y-6">
              <Input placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              <Input placeholder="Email Address" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
              <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Textarea placeholder="Skills & Interests" rows={4} value={formData.skills} onChange={(e) => handleInputChange("skills", e.target.value)} />
              <Input placeholder="Resume Link / Portfolio" value={formData.resumeLink} onChange={(e) => handleInputChange("resumeLink", e.target.value)} />
              <div className="flex items-center space-x-2">
                <Checkbox checked={formData.agreeTerms} onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)} />
                <Label>I agree to the <a href="#" className="text-primary hover:underline">Terms & Conditions</a></Label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={step === 1 ? () => setIsModalOpen(false) : handlePrevious}>
              {step === 1 ? "Cancel" : "Previous"}
            </Button>
            <Button onClick={step === 2 ? handleSubmit : handleNext} className=" text-white hover:opacity-90" disabled={step === 2 && !formData.agreeTerms}>
              {step === 2 ? "Submit Application" : "Next"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

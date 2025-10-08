"use client"

import { useState, useMemo, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import toast from "react-hot-toast"

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
  program?: {
    _id?: string
    title: string
    stipend: number | string
    type: string
    duration: string
    technologies: string[]
    responsibilities: string[]
    requirements: string[]
    popular?: boolean
  }
}

export function ApplyModal({ isOpen, onClose, program }: ApplyModalProps) {
  const [step, setStep] = useState(1)
  const { user, loading: authLoading } = useAuth()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
    agreeTerms: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isStepValid = () => {
    if (step === 1) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.education.trim() !== ""
      )
    }
    if (step === 2) {
      return formData.experience.trim() !== "" && formData.motivation.trim() !== ""
    }
    if (step === 3) {
      return formData.agreeTerms
    }
    return true
  }

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [user])

  const stipendNumber = useMemo(() => {
    if (!program?.stipend) return 0
    const value = typeof program.stipend === "string" ? program.stipend : program.stipend.toString()
    return parseFloat(value.replace(/[₹,]/g, ""))
  }, [program])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!user?._id || !program?._id) {
      toast.error("Please wait... User or program not loaded yet.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          studentId: user._id,
          programId: program._id,
          formData,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data?.message || "Server error")

      toast.success("Application submitted successfully!")
      onClose()
    } catch (err: any) {
      toast.error("Application failed: " + (err.message || "Server error"))
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return null

  if (!user)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Please Log In to Apply</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="mb-4">You need to be logged in to apply for programs.</p>
            <Button
              variant="outline"
              className="text-primary"
              onClick={() => {
                onClose()
                window.location.href = "/login"
              }}
            >
              Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )

  const renderStipend = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Apply for {program?.title || "Program"}</DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
              </div>
              {stepNumber < 3 && <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  readOnly={!!user?.name}
                  className={user?.name ? "bg-gray-100 cursor-not-allowed" : ""}
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  readOnly={!!user?.name}
                  className={user?.name ? "bg-gray-100 cursor-not-allowed" : ""}
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                readOnly={!!user?.email}
                className={user?.email ? "bg-gray-100 cursor-not-allowed" : ""}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required />
            </div>
            <div>
              <Label>Education</Label>
              <Select onValueChange={(v) => handleInputChange("education", v)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's</SelectItem>
                  <SelectItem value="masters">Master's</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Background & Goals</h3>
            <div>
              <Label>Experience</Label>
              <Select onValueChange={(v) => handleInputChange("experience", v)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Motivation</Label>
              <Textarea value={formData.motivation} onChange={(e) => handleInputChange("motivation", e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Confirmation</h3>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Stipend</span>
              <span>{renderStipend(stipendNumber)}</span>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                checked={formData.agreeTerms}
                onCheckedChange={(c) => handleInputChange("agreeTerms", c as boolean)}
              />
              <Label>I agree to Terms & Privacy Policy</Label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={step === 1 ? onClose : handlePrevious}>
            {step === 1 ? "Cancel" : "Previous"}
          </Button>
          <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={!isStepValid() || loading}>
            {loading ? "Processing..." : step === 3 ? "Submit Application" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

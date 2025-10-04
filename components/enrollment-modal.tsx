"use client"

import { useState, useMemo } from "react"
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

// Mock coupons
const VALID_COUPONS = {
  CODE10: 0.1,
  SUMMER20: 0.2,
}

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  course?: {
    _id?: string
    title: string
    price: string
    originalPrice: string
    duration: string
    features: string[]
  }
}

export function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
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
    paymentPlan: "full",
    agreeTerms: false,
    couponCode: "",
  })
  const [couponStatus, setCouponStatus] = useState<"initial" | "valid" | "invalid">("initial")
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

const originalPriceNumber = useMemo(() => {
  if (!course?.originalPrice) return 0
  const value = typeof course.originalPrice === "string" ? course.originalPrice : course.originalPrice.toString()
  return parseFloat(value.replace(/[₹,]/g, ""))
}, [course])

const priceNumber = useMemo(() => {
  if (!course?.price) return 0
  const value = typeof course.price === "string" ? course.price : course.price.toString()
  return parseFloat(value.replace(/[₹,]/g, ""))
}, [course])


  const discountedPrice = useMemo(() => {
    const finalPrice = formData.paymentPlan === "full" ? priceNumber : originalPriceNumber
    return finalPrice - finalPrice * appliedDiscount
  }, [priceNumber, originalPriceNumber, appliedDiscount, formData.paymentPlan])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCouponApply = () => {
    const code = formData.couponCode.toUpperCase() as keyof typeof VALID_COUPONS
    if (code in VALID_COUPONS) {
      setAppliedDiscount(VALID_COUPONS[code])
      setCouponStatus("valid")
    } else {
      setAppliedDiscount(0)
      setCouponStatus("invalid")
    }
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

  if (!user) {
    setError("You must be logged in to enroll.")
    setLoading(false)
    return
  }

  try {
    const response = await fetch("/api/enrollments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
 credentials: "include",
      body: JSON.stringify({
        studentId: user._id,      
        courseId: course?._id,
        formData,
      }),
    })

    const data = await response.json()

    if (!response.ok) throw new Error(data?.message || "Server error")

    toast.success("Enrollment successful!")
    onClose()
  } catch (err: any) {
    toast.error("Enrollment API Error:", err)
    setError(err.message)
  }
  
   finally {
    setLoading(false)
  }
}


  const renderPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)

  if (authLoading) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Enroll in {course?.title || "Course"}</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
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

        {/* ---------------- Step Screens ---------------- */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={formData.firstName} onChange={(e) => handleInputChange("firstName", e.target.value)} />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
            </div>
            <div>
              <Label>Education</Label>
              <Select onValueChange={(v) => handleInputChange("education", v)}>
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

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Background & Goals</h3>
            <div>
              <Label>Experience</Label>
              <Select onValueChange={(v) => handleInputChange("experience", v)}>
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

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Payment & Confirmation</h3>
            <div>
              <Label>Coupon Code</Label>
              <div className="flex gap-2">
                <Input value={formData.couponCode} onChange={(e) => handleInputChange("couponCode", e.target.value)} />
                <Button onClick={handleCouponApply}>Apply</Button>
              </div>
              {couponStatus === "valid" && <p className="text-green-500">Coupon Applied!</p>}
              {couponStatus === "invalid" && <p className="text-red-500">Invalid Coupon</p>}
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{renderPrice(formData.paymentPlan === "full" ? priceNumber : originalPriceNumber)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>
                    -
                    {renderPrice(
                      (formData.paymentPlan === "full" ? priceNumber : originalPriceNumber) * appliedDiscount
                    )}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{renderPrice(discountedPrice)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
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
          <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={step === 3 && (!formData.agreeTerms || loading)}>
            {loading ? "Processing..." : step === 3 ? "Complete Enrollment" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

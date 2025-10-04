
"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

// Define a simple mock for valid coupons
const VALID_COUPONS = {
  "CODE10": 0.10, // 10% discount
  "SUMMER20": 0.20, // 20% discount
}

interface EnrollmentModalProps {
  isOpen: boolean
  onClose: () => void
  course?: {
    title: string
    price: string
    originalPrice: string
    duration: string
    features: string[]
  }
}

export function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    motivation: "",
    paymentPlan: "full", // Default to full payment
    agreeTerms: false,
    couponCode: "",
  })
  const [couponStatus, setCouponStatus] = useState<"initial" | "valid" | "invalid">("initial")
  const [appliedDiscount, setAppliedDiscount] = useState(0)


  const originalPriceNumber = useMemo(() => {
  return course?.originalPrice
    ? parseFloat(course.originalPrice.toString().replace(/[₹,]/g, ''))
    : 0;
}, [course]);

const priceNumber = useMemo(() => {
  return course?.price
    ? parseFloat(course.price.toString().replace(/[₹,]/g, ''))
    : 0;
}, [course]);


  const discountedPrice = useMemo(() => {
    const finalPrice = formData.paymentPlan === "full" ? priceNumber : originalPriceNumber;
    return finalPrice - (finalPrice * appliedDiscount);
  }, [priceNumber, originalPriceNumber, appliedDiscount, formData.paymentPlan]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCouponApply = () => {
    const code = formData.couponCode.toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedDiscount(VALID_COUPONS[code]);
      setCouponStatus("valid");
    } else {
      setAppliedDiscount(0);
      setCouponStatus("invalid");
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };



 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!session?.user?.id) {  // <-- use session from useSession
      setError("You must be logged in to enroll.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: session.user.id,
          courseId: course?.title, // or course._id
          formData
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data?.message || "Server error")
      }

      alert("Enrollment successful!")
      onClose()
    } catch (err: any) {
      console.error("Enrollment API Error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  const renderPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

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

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            {/* Form Fields... (same as before) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education Background</Label>
              <Select onValueChange={(value) => handleInputChange("education", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Background & Motivation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Background & Goals</h3>
              <p className="text-muted-foreground">Help us understand your journey</p>
            </div>
            {/* Form Fields... (same as before) */}
            <div className="space-y-2">
              <Label htmlFor="experience">Programming Experience</Label>
              <Select onValueChange={(value) => handleInputChange("experience", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Complete Beginner</SelectItem>
                  <SelectItem value="some-knowledge">Some Knowledge</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join this course?</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="Tell us about your goals and what you hope to achieve..."
                rows={4}
              />
            </div>
            {/* Course Summary... (same as before) */}
            {course && (
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Course Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Course:</span>
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="font-medium text-primary">{course.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Payment & Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Payment & Confirmation</h3>
              <p className="text-muted-foreground">Choose your payment plan and confirm details</p>
            </div>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <Label htmlFor="couponCode">Coupon Code</Label>
              <div className="flex gap-2">
                <Input
                  id="couponCode"
                  value={formData.couponCode}
                  onChange={(e) => handleInputChange("couponCode", e.target.value)}
                  placeholder="Enter coupon code"
                />
                <Button onClick={handleCouponApply}>Apply</Button>
              </div>
              {couponStatus === "valid" && (
                <p className="text-sm text-green-500 font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" /> Coupon Applied! You get a {appliedDiscount * 100}% discount.
                </p>
              )}
              {couponStatus === "invalid" && (
                <p className="text-sm text-red-500 font-medium">
                  Invalid coupon code.
                </p>
              )}
            </div>

            {/* Payment Plan Section */}
            <div className="space-y-4">
              <Label>Payment Plan</Label>
              <div className="grid gap-3">
                <Card
                  className={`cursor-pointer transition-colors ${
                    formData.paymentPlan === "full" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleInputChange("paymentPlan", "full")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Pay in Full</div>
                        <div className="text-sm text-muted-foreground">One-time payment</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{course?.price}</div>
                        <Badge variant="secondary" className="text-xs">Save 10%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`cursor-pointer transition-colors ${
                    formData.paymentPlan === "installment" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleInputChange("paymentPlan", "installment")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">3 Monthly Installments</div>
                        <div className="text-sm text-muted-foreground">₹15,000 x 3 months</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">₹45,000</div>
                        <div className="text-xs text-muted-foreground">Total</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Subtotal:</span>
                <span className="text-sm font-medium">{renderPrice(formData.paymentPlan === "full" ? priceNumber : originalPriceNumber)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between items-center text-green-500">
                  <span className="text-sm font-medium">Discount:</span>
                  <span className="text-sm font-medium">- {renderPrice((formData.paymentPlan === "full" ? priceNumber : originalPriceNumber) * appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center font-bold text-xl pt-2">
                <span>Total:</span>
                <span>{renderPrice(discountedPrice)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
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
          <Button variant="outline" onClick={step === 1 ? onClose : handlePrevious}>
            {step === 1 ? "Cancel" : "Previous"}
          </Button>
          <Button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={step === 3 && !formData.agreeTerms}
            className="gradient-primary"
          >
            {step === 3 ? "Complete Enrollment" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.")
}
function setError(arg0: string) {
  throw new Error("Function not implemented.")
}


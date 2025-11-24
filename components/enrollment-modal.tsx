// "use client"

// import { useState, useMemo, useEffect } from "react"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { CheckCircle } from "lucide-react"
// import { useAuth } from "@/components/auth-provider"
// import toast from "react-hot-toast"


// const loadRazorpayScript = (): Promise<boolean> => {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };



// interface EnrollmentModalProps {
//   isOpen: boolean
//   onClose: () => void
//   course?: {
//     _id?: string
//     title: string
//     price: number | string
//     originalPrice: number | string
//     maxStudents: number
//     rating: number
//     duration: string
//     couponCode: { code: string; discount: number }[]
//     features: string[]
//   }
// }

// export function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
//   const [step, setStep] = useState(1)
//   const { user, loading: authLoading } = useAuth()

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     education: "",
//     experience: "",
//     motivation: "",
//     paymentPlan: "full",
//     agreeTerms: false,
//     couponCode: "",
//   })
//   const [couponStatus, setCouponStatus] = useState<"initial" | "valid" | "invalid">("initial")
//   const [appliedDiscount, setAppliedDiscount] = useState(0)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   const isStepValid = () => {
//   if (step === 1) {
//     return (
//       formData.firstName.trim() !== "" &&
//       formData.lastName.trim() !== "" &&
//       formData.email.trim() !== "" &&
//      isValidIndianNumber(formData.phone) &&
//       formData.education.trim() !== ""
//     )
//   }
//   if (step === 2) {
//     return (
//       formData.experience.trim() !== "" &&
//       formData.motivation.trim() !== ""
//     )
//   }
//   if (step === 3) {
//     return formData.agreeTerms
//   }
//   return true
// }



// useEffect(() => {
//   if (user) {
//     setFormData((prev) => ({
//       ...prev,
//       firstName: user.name?.split(" ")[0] || "",
//       lastName: user.name?.split(" ")[1] || "",
//       email: user.email || "",
//       phone: user.phone || "",
//     }));
//   }
// }, [user]);



// const originalPriceNumber = useMemo(() => {
//   if (!course?.originalPrice) return 0
//   const value = typeof course.originalPrice === "string" ? course.originalPrice : course.originalPrice.toString()
//   return parseFloat(value.replace(/[₹,]/g, ""))
// }, [course])

// const priceNumber = useMemo(() => {
//   if (!course?.price) return 0
//   const value = typeof course.price === "string" ? course.price : course.price.toString()
//   return parseFloat(value.replace(/[₹,]/g, ""))
// }, [course])


//   const discountedPrice = useMemo(() => {
//     const finalPrice = formData.paymentPlan === "full" ? priceNumber : originalPriceNumber
//     return finalPrice - finalPrice * appliedDiscount
//   }, [priceNumber, originalPriceNumber, appliedDiscount, formData.paymentPlan])

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }


//   const isValidIndianNumber = (num: string) => {
//   const regex = /^[6-9]\d{9}$/;
//   return regex.test(num);
// };



//   const handleCouponApply = () => {

//      console.log("Course object in modal:", course);

   

//   const codeInput = formData.couponCode.trim().toUpperCase();
//   const coupon = course?.couponCode?.find(c => c.code.toUpperCase() === codeInput);

//   if (coupon) {
//     setAppliedDiscount(coupon.discount);
//     setCouponStatus("valid");
//   } else {
//     setAppliedDiscount(0);
//     setCouponStatus("invalid");
//   }
// };








//   const handleNext = () => {
//     if (step < 3) setStep(step + 1)
//   }

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1)
//   }



// const handleSubmit = async () => {
//   if (!course?._id || !user?._id) return;
//   setLoading(true);
//   setError("");

//   try {
//     const res = await fetch("/api/razorpay/create-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         studentId: user._id,
//         courseId: course._id,
//         amount: discountedPrice,
//       }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.error || "Failed to create order");

//     const { order } = data;

//     const isLoaded = await loadRazorpayScript();
//     if (!isLoaded) {
//       setError("Razorpay SDK failed to load");
//       return;
//     }

//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Upcoder",
//       description: course.title,
//       order_id: order.id,
//       handler: async function (response: any) {
//         // Verify payment
//         const verifyRes = await fetch("/api/razorpay/verify-payment", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//             studentId: user._id,
//             courseId: course._id,
//             formData,
//             amount: discountedPrice,
//           }),
//         });

//         const verifyData = await verifyRes.json();

//         if (verifyRes.ok) {
//           // ✅ Redirect on success
//           window.location.href = `/payment-status?status=success&courseId=${course._id}`;
//         } else {
//           // ❌ Redirect on failure
//           window.location.href = `/payment-status?status=failed&courseId=${course._id}`;
//         }
//       },
//       prefill: {
//         name: user.name,
//         email: user.email,
//         contact: user.phone,
//       },
//       theme: { color: "#0ea5e9" },
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   } catch (err: any) {
//     console.error(err);
//     setError(err.message);
//   } finally {
//     setLoading(false);
//   }
// };




  


//   const renderPrice = (price: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)

//   if (authLoading) return null

//   // in use loggedin tahns show form othervise show login/signup prompt
//   if (!user) 
//     return (
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-2xl">Please Log In to Enroll</DialogTitle>
//           </DialogHeader>
//           <div className="mt-4">
//             <p className="mb-4">You need to be logged in to enroll in courses.</p>
//             <Button variant="outline" className="text-primary" onClick={() => { onClose(); window.location.href = "/login"; }}>
//               Go to Login
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     )
   

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">Enroll in {course?.title || "Course"}</DialogTitle>
//         </DialogHeader>

//         {/* Progress Indicator */}
//         <div className="flex items-center justify-between mb-8">
//           {[1, 2, 3].map((stepNumber) => (
//             <div key={stepNumber} className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                   step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
//                 }`}
//               >
//                 {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
//               </div>
//               {stepNumber < 3 && <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-primary" : "bg-muted"}`} />}
//             </div>
//           ))}
//         </div>

//         {/* ---------------- Step Screens ---------------- */}
//         {step === 1 && (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Personal Information</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>First Name</Label>
//                 <Input
//     value={formData.firstName}
//     onChange={(e) => handleInputChange("firstName", e.target.value)}
//     readOnly={!!user?.name}
//     className={user?.name ? "bg-gray-100 cursor-not-allowed" : ""}
//   />
//               </div>
//               <div>
//                 <Label>Last Name</Label>
//                 <Input
//     value={formData.lastName}
//     onChange={(e) => handleInputChange("lastName", e.target.value)}
//     readOnly={!!user?.name}
//     className={user?.name ? "bg-gray-100 cursor-not-allowed" : ""}
//   />
//               </div>
//             </div>
//             <div>
//               <Label>Email</Label>
//                <Input
//     type="email"
//     value={formData.email}
//     onChange={(e) => handleInputChange("email", e.target.value)}
//     readOnly={!!user?.email}
//     className={user?.email ? "bg-gray-100 cursor-not-allowed" : ""}
//   />
//             </div>
//             <div>
//   <Label>Phone</Label>
//   <Input
//     value={formData.phone}
//     onChange={(e) => handleInputChange("phone", e.target.value)}
//     readOnly={!!user?.phone}
//     className={user?.phone ? "bg-gray-100 cursor-not-allowed" : ""}
//   />

//   {!isValidIndianNumber(formData.phone) && formData.phone.length > 0 && (
//     <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit Indian number starting with 6–9</p>
//   )}
// </div>

//             <div>
//               <Label>Education</Label>
//               <Select onValueChange={(v) => handleInputChange("education", v)} required>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select education" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="high-school">High School</SelectItem>
//                   <SelectItem value="bachelors">Bachelor's</SelectItem>
//                   <SelectItem value="masters">Master's</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Background & Goals</h3>
//             <div>
//               <Label>Experience</Label>
//               <Select onValueChange={(v) => handleInputChange("experience", v)} required>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select experience" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="beginner">Beginner</SelectItem>
//                   <SelectItem value="intermediate">Intermediate</SelectItem>
//                   <SelectItem value="advanced">Advanced</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label>Motivation</Label>
//               <Textarea value={formData.motivation} onChange={(e) => handleInputChange("motivation", e.target.value)} />
//             </div>
//           </div>
//         )}

//         {step === 3 && (
//           <div className="space-y-6">
//             <h3 className="text-lg font-semibold">Payment & Confirmation</h3>
//             <div>
//               <Label>Coupon Code</Label>
//               <div className="flex gap-2">
//                 <Input value={formData.couponCode} onChange={(e) => handleInputChange("couponCode", e.target.value)} />
//                 <Button onClick={handleCouponApply}>Apply</Button>
//               </div>
//               {couponStatus === "valid" && <p className="text-green-500">Coupon Applied!</p>}
//               {couponStatus === "invalid" && <p className="text-red-500">Invalid Coupon</p>}
//             </div>

//             {/* Price Summary */}
//             <div className="border-t pt-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>{renderPrice(formData.paymentPlan === "full" ? priceNumber : originalPriceNumber)}</span>
//               </div>
//               {appliedDiscount > 0 && (
//                 <div className="flex justify-between text-green-500">
//                   <span>Discount</span>
//                   <span>
//                     -
//                     {renderPrice(
//                       (formData.paymentPlan === "full" ? priceNumber : originalPriceNumber) * appliedDiscount
//                     )}
//                   </span>
//                 </div>
//               )}
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>{renderPrice(discountedPrice)}</span>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 checked={formData.agreeTerms}
//                 onCheckedChange={(c) => handleInputChange("agreeTerms", c as boolean)}
//               />
//               <Label>I agree to Terms & Privacy Policy</Label>
//             </div>

//             {error && <p className="text-red-500">{error}</p>}
//           </div>
//         )}

//         {/* Navigation */}
//         <div className="flex justify-between pt-6 border-t">
//           <Button variant="outline" onClick={step === 1 ? onClose : handlePrevious}>
//             {step === 1 ? "Cancel" : "Previous"}
//           </Button>
//         <Button
//   onClick={step === 3 ? handleSubmit : handleNext}
//   disabled={!isStepValid() || !user?._id || !course?._id || loading}
// >
//   {loading ? "Processing..." : step === 3 ? "Complete Enrollment" : "Next"}
// </Button>

//         </div>
//       </DialogContent>
//     </Dialog>
//   )



// }
"use client";

import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import toast from "react-hot-toast";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course?: {
    _id?: string;
    title: string;
    price: number | string;
    originalPrice: number | string;
    maxStudents: number;
    rating: number;
    duration: string;
    couponCode: { code: string; discount: number }[];
    features: string[];
  };
}

export function EnrollmentModal({ isOpen, onClose, course }: EnrollmentModalProps) {
  const [step, setStep] = useState(1);
  const { user, loading: authLoading } = useAuth();

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
  });

  const [couponStatus, setCouponStatus] = useState<"initial" | "valid" | "invalid">("initial");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        isValidIndianNumber(formData.phone) &&
        formData.education.trim() !== "";
    }
    if (step === 2) {
      return formData.experience.trim() !== "" && formData.motivation.trim() !== "";
    }
    if (step === 3) {
      return formData.agreeTerms;
    }
    return true;
  };

  const isValidIndianNumber = (num: string) => /^[6-9]\d{9}$/.test(num);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const originalPriceNumber = useMemo(() => {
    if (!course?.originalPrice) return 0;
    const value = typeof course.originalPrice === "string" ? course.originalPrice : course.originalPrice.toString();
    return parseFloat(value.replace(/[₹,]/g, ""));
  }, [course]);

  const priceNumber = useMemo(() => {
    if (!course?.price) return 0;
    const value = typeof course.price === "string" ? course.price : course.price.toString();
    return parseFloat(value.replace(/[₹,]/g, ""));
  }, [course]);

  const discountedPrice = useMemo(() => {
    const finalPrice = formData.paymentPlan === "full" ? priceNumber : originalPriceNumber;
    return finalPrice - finalPrice * appliedDiscount;
  }, [priceNumber, originalPriceNumber, appliedDiscount, formData.paymentPlan]);

  const handleCouponApply = () => {
    const codeInput = formData.couponCode.trim().toUpperCase();
    const coupon = course?.couponCode?.find((c) => c.code.toUpperCase() === codeInput);
    if (coupon) {
      setAppliedDiscount(coupon.discount);
      setCouponStatus("valid");
      toast.success(`Coupon applied! ${coupon.discount * 100}% off`);
    } else {
      setAppliedDiscount(0);
      setCouponStatus("invalid");
      toast.error("Invalid coupon code");
    }
  };

  const handleNext = () => step < 3 && setStep(step + 1);
  const handlePrevious = () => step > 1 && setStep(step - 1);

  const renderPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  if (authLoading) return null;

  if (!user)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Please Log In to Enroll</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="mb-4">You need to be logged in to enroll in courses.</p>
            <Button
              variant="outline"
              className="text-primary"
              onClick={() => {
                onClose();
                window.location.href = "/login";
              }}
            >
              Go to Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );

  // ------------------ Razorpay Checkout ------------------
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const res = await loadRazorpayScript();
  if (!res) return alert("Razorpay SDK failed to load.");

  try {
    const orderRes = await fetch("/api/razorpay/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: user._id,
        courseId: course._id,
        amount: discountedPrice,
        formData,
      }),
    }).then((res) => res.json());

    if (!orderRes.success) throw new Error(orderRes.message || "Order creation failed");

    // ✅ Razorpay QR disabled version
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderRes.order.amount,
      currency: orderRes.order.currency,
      name: "Upcoder",
      description: course.title,
      order_id: orderRes.order.id,

      handler: async (response: any) => {
        const verifyRes = await fetch("/api/razorpay/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            enrollmentId: orderRes.enrollment._id,
          }),
        }).then((res) => res.json());

        if (verifyRes.success) {
          window.location.href = `/payment-status?order_id=${response.razorpay_order_id}`;
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },

      //  🚫 Disable QR, Allow UPI Intent Only
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: false,
        emi: false,
      },

      upi: {
        method: ["upi_intent"], // only intent, NO QR
      },

      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Enroll in {course?.title || "Course"}</DialogTitle>
        </DialogHeader>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Steps */}
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
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                readOnly={!!user?.phone}
                className={user?.phone ? "bg-gray-100 cursor-not-allowed" : ""}
              />
              {!isValidIndianNumber(formData.phone) && formData.phone.length > 0 && (
                <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit Indian number starting with 6–9</p>
              )}
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

            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{renderPrice(formData.paymentPlan === "full" ? priceNumber : originalPriceNumber)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>
                    -{renderPrice((formData.paymentPlan === "full" ? priceNumber : originalPriceNumber) * appliedDiscount)}
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
          <Button onClick={step === 3 ? handleSubmit : handleNext} disabled={!isStepValid() || loading}>
            {loading ? "Processing..." : step === 3 ? "Pay Now" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/auth-provider" 
import toast from "react-hot-toast"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc"


type AuthFlowStep = 'login' | 'signup' | 'forgot_email' | 'verify_otp' | 'reset_password'

export default function AuthPage() {
  const router = useRouter()
  const { login, register } = useAuth() 
  const [currentStep, setCurrentStep] = useState<AuthFlowStep>('signup')
  const [loading, setLoading] = useState(false)

  // Signup state
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Forgot/reset password state
  const [forgotEmail, setForgotEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // ---------------- HANDLERS ----------------


const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newUser = await register(signupEmail, signupPassword, signupName, signupPhone)
      toast.success("Account created successfully!")
      if (newUser?.role === 'admin') {
        router.push("/admin")
        return
      }
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const loggedInUser = await login(loginEmail, loginPassword)
      toast.success("Logged in successfully!")
      if (loggedInUser?.role === 'admin') {
        router.push("/admin")
        return
      }
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  

  async function sendOtp(email: string) {
  try {
    const res = await fetch("/api/auth/forgot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send OTP");

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to send OTP");
  }
}

  const handleForgotEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    await sendOtp(forgotEmail);
    toast.success("OTP sent to your email");
    setCurrentStep("verify_otp");
  } catch (error: any) {
    toast.error(error.message || "Failed to send OTP");
  } finally {
    setLoading(false);
  }
}


  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Call your backend API to verify OTP
      await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp })
      })
      toast.success("OTP verified!")
      setCurrentStep("reset_password")
    } catch (error: any) {
      toast.error(error.message || "OTP verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, password: newPassword })
      })
      toast.success("Password reset successfully!")
      setCurrentStep("login")
      setForgotEmail("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
    
  }



  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendClick = () => {
    handleForgotEmailSubmit(new Event("submit") as any);
    setTimer(30); 
    setCanResend(false);
  };




  // ----------------- RENDER -----------------

  const renderSocialLogin = () => (
    <div className="mt-4 flex space-x-2">
     {/* <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
     
      >
        <FcGoogle size={20} />
        Continue with Google
      </Button> */}

      <Button
  variant="outline"
  className="w-full flex items-center justify-center gap-2"
  onClick={() => window.location.href = "/api/auth/google"}
>
  <FcGoogle size={20} />
  Continue with Google
</Button>


    
      {/* <Button variant="outline" className="w-full flex items-center justify-center gap-2">
        Continue with GitHub
      </Button> */}
    </div>
  )

  const showTabs = currentStep === 'signup' || currentStep === 'login'

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-0">
      <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-3xl bg-background border border-border/50">
        {/* Left Section */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tl from-indigo-500 to-blue-600 p-8 relative">
          {/* <img src="" alt="Learning illustration" className="max-w-md animate-fade-in-up"/> */}
          <Image src="/Upcoderlogoblack.png" alt="Learning illustration" width={350} height={350} className="animate-fade-in-up" />
          <div className="absolute bottom-8 left-8 text-white text-opacity-80">
            <h2 className="text-3xl font-bold mb-2">Welcome to Upcoder!</h2>
            <p className="text-lg">Your journey to knowledge starts here.</p>
          </div>
        </div>

        {/* Right Section */}
        <Card className="w-full md:w-[450px] flex-shrink-0 border-none shadow-none rounded-none">
          <CardHeader className="pt-8 pb-4">
            <CardTitle className="text-3xl text-center font-bold tracking-tight text-foreground">
              {currentStep === 'signup' ? "Create Account" : currentStep === 'login' ? "Log In" : currentStep === 'forgot_email' ? "Forgot Password" : currentStep === 'verify_otp' ? "Verify OTP" : "Reset Password"}
            </CardTitle>
          </CardHeader>

          {showTabs && (
            <div className="px-6 pb-4">
              <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as AuthFlowStep)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/60">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          <CardContent>
            {currentStep === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <Input type="text" placeholder="Full Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                <Input type="email" placeholder="Email Address" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                <Input type="tel" placeholder="Phone Number" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)}  required/>
                <Input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
                {renderSocialLogin()}
              </form>
            )}

            {currentStep === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Logging in..." : "Log In"}</Button>
                <Button variant="link" className="text-sm" onClick={() => setCurrentStep('forgot_email')}>Forgot Password?</Button>
                {renderSocialLogin()}
              </form>
            )}

            {currentStep === 'forgot_email' && (
              <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
                <Input type="email" placeholder="Registered Email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Send OTP"}</Button>
              </form>
            )}

            {currentStep === 'verify_otp' && (
              <form onSubmit={handleOtpVerification} className="space-y-4">
                <Input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              

                 <Button
        variant="link"
        className="text-sm underline bg-none"
        onClick={handleResendClick}
        disabled={!canResend || loading}
      >
        {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
      </Button>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Verify OTP"}</Button>
              </form>
            )}

            {currentStep === 'reset_password' && (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <Button type="submit" className="w-full" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

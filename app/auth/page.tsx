"use client"
import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs" 

// Define the steps for the Forgot Password flow
type AuthFlowStep = 'login' | 'signup' | 'forgot_email' | 'verify_otp' | 'reset_password'

export default function AuthPage() {
  // State to manage the overall authentication view (replaces activeTab and isForgotPassword)
  const [currentStep, setCurrentStep] = useState<AuthFlowStep>('signup')

  // --- State for Forms ---
  
  // State for Signup
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPhone, setSignupPhone] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  // State for Login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  // State for Forgot Password / Reset
  const [forgotEmail, setForgotEmail] = useState("")
  const [otp, setOtp] = useState("") // New state for OTP
  const [newPassword, setNewPassword] = useState("") // New state for new password
  const [confirmPassword, setConfirmPassword] = useState("") // New state for confirmation

  // --- Handlers ---
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Signup with:", signupName, signupEmail, signupPhone, signupPassword)
    // TODO: integrate backend signup API
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login with:", loginEmail, loginPassword)
    // TODO: integrate backend login API
  }

  // STEP 1: Send Reset Email
  const handleForgotEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Forgot Password Request for:", forgotEmail)
    // TODO: Call API to send OTP
    // On success:
    setCurrentStep('verify_otp')
  }
  
  // STEP 2: Verify OTP
  const handleOtpVerification = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Verifying OTP:", otp, "for email:", forgotEmail)
    // TODO: Call API to verify OTP
    // On success:
    setCurrentStep('reset_password')
  }
  
  // STEP 3: Reset Password
  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    console.log("Resetting password for:", forgotEmail, "with new password:", newPassword)
    // TODO: Call API to reset password
    // On success:
    alert("Password reset successfully! Redirecting to login.")
    setCurrentStep('login') 
    setForgotEmail(""); // Clear the email field
  }

  // Helper function to render Social Login buttons
  const renderSocialLogin = () => (
    <>
        <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted-foreground/20"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/><circle cx="12" cy="12" r="7"/></svg>
                Google
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3M19 12c.76 1.8 1.47 3.65 1.57 4.54"/><path d="M12 20.84v-3.21"/><path d="M15 15.65c-.2-.18-.4-.36-.6-.54l-2.4-2.18"/><path d="M9 15.65c.2-.18.4-.36.6-.54l2.4-2.18"/><path d="M12 3a7 7 0 0 0-7 7c0 2.25 1.8 4.63 2.94 6.75A1.85 1.85 0 0 0 8.35 19H12"/><path d="M12 3a7 7 0 0 1 7 7c0 2.25-1.8 4.63-2.94 6.75A1.85 1.85 0 0 1 15.65 19H12"/></svg>
                GitHub
            </Button>
        </div>
    </>
  )
  
  // Determine Card Content based on the current step
  const getCardContent = () => {
    switch (currentStep) {
      // -------------------------------------------------------------------
      // FORGOT PASSWORD - STEP 1: Email Input
      // -------------------------------------------------------------------
      case 'forgot_email':
        return (
          <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Registered Email Address"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full font-semibold h-10 text-lg">
              Send OTP
            </Button>
            <div className="text-center">
              <Button variant="link" className="p-0 text-sm text-primary" onClick={() => setCurrentStep('login')}>
                &larr; Back to Login
              </Button>
            </div>
          </form>
        )

      // -------------------------------------------------------------------
      // FORGOT PASSWORD - STEP 2: OTP Verification
      // -------------------------------------------------------------------
      case 'verify_otp':
        return (
          <form onSubmit={handleOtpVerification} className="space-y-4">
            <p className="text-sm text-center text-muted-foreground mb-4">
              We sent a 6-digit code to **{forgotEmail}**. Please check your inbox.
            </p>
            <Input
              type="text"
              placeholder="Enter 6-Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="text-center text-xl tracking-[0.5em] focus:tracking-[0.25em] transition-all" // Enhanced OTP input
            />
            <Button type="submit" className="w-full font-semibold h-10 text-lg">
              Verify Code
            </Button>
            <div className="text-center">
                <Button variant="link" className="p-0 text-sm text-primary" onClick={() => handleForgotEmailSubmit(new Event('submit') as unknown as React.FormEvent)}>
                    Resend Code
                </Button>
            </div>
          </form>
        )

      // -------------------------------------------------------------------
      // FORGOT PASSWORD - STEP 3: Reset Password
      // -------------------------------------------------------------------
      case 'reset_password':
        return (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            <Button type="submit" className="w-full font-semibold h-10 text-lg">
              Set New Password
            </Button>
            <div className="text-center">
              <Button variant="link" className="p-0 text-sm text-primary" onClick={() => setCurrentStep('login')}>
                &larr; Back to Login
              </Button>
            </div>
          </form>
        )

      // -------------------------------------------------------------------
      // SIGNUP FORM (Default Tabs)
      // -------------------------------------------------------------------
      case 'signup':
      case 'login':
      default:
        // Render Signup or Login based on active tab state (which now defaults to currentStep)
        return (
          <>
            {(currentStep === 'signup') ? (
              <form onSubmit={handleSignup} className="space-y-4">
                <Input type="text" placeholder="Full Name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                <Input type="email" placeholder="Email Address" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                <Input type="tel" placeholder="Phone Number (Optional)" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} />
                <Input type="password" placeholder="Password (min 6 characters)" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} />
                <Button type="submit" className="w-full font-semibold h-10 text-lg">Create Account</Button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="email" placeholder="Email Address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                <Button type="submit" className="w-full font-semibold h-10 text-lg">Log In</Button>
                <div className="text-right">
                  <Button variant="link" className="p-0 text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setCurrentStep('forgot_email')}>
                    Forgot Password?
                  </Button>
                </div>
              </form>
            )}
            {renderSocialLogin()}
          </>
        )
    }
  }

  // Determine the Title for the Card Header
  const getCardTitle = () => {
    switch (currentStep) {
      case 'forgot_email': return "Forgot Password"
      case 'verify_otp': return "Verify Your Account"
      case 'reset_password': return "Set New Password"
      default: return "RidBharat Auth"
    }
  }

  // Determine the Description for the Card Header
  const getCardDescription = () => {
    switch (currentStep) {
      case 'forgot_email': return "Enter your email to receive a password reset code."
      case 'verify_otp': return "Enter the 6-digit code we sent to your email."
      case 'reset_password': return "Choose a strong, new password."
      case 'signup': return "Create an account to start your learning journey"
      case 'login': return "Welcome back! Sign in to continue"
      default: return "Manage your account"
    }
  }

  // Check if tabs should be shown
  const showTabs = currentStep === 'signup' || currentStep === 'login';

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-0">
      
      <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-3xl bg-background border border-border/50">
        
        {/* Left Section: Image (Desktop only) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tl from-indigo-500 to-blue-600 p-8 relative">
          <img 
            src="/images/auth-visual.svg" 
            alt="Learning illustration" 
            className="max-w-md animate-fade-in-up"
          />
          <div className="absolute bottom-8 left-8 text-white text-opacity-80">
            <h2 className="text-3xl font-bold mb-2">Welcome to RidBharat!</h2>
            <p className="text-lg">Your journey to knowledge starts here.</p>
          </div>
        </div>

        {/* Right Section: Auth Card */}
        <Card className="w-full md:w-[450px] flex-shrink-0 border-none shadow-none rounded-none">
          <CardHeader className="pt-8 pb-4">
            <CardTitle className="text-3xl text-center font-bold tracking-tight text-foreground">{getCardTitle()}</CardTitle>
            <p className="text-center text-sm text-muted-foreground mt-1">{getCardDescription()}</p>
          </CardHeader>
          
          {/* Tabs are only shown during Signup/Login */}
          {showTabs && (
            <div className="px-6 pb-4">
                <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as AuthFlowStep)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-muted/60">
                        <TabsTrigger value="signup" className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">Sign Up</TabsTrigger>
                        <TabsTrigger value="login" className="text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
          )}

          <CardContent>
            {getCardContent()}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
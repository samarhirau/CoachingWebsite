



import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, Users, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info - REVISED for Course Platform */}
          <div className="space-y-4">
            <div className="">
              {/* Assuming this logo is the UPCODER logo */}
              <img src="/Upcoderlogoblack.png" alt="Upcoder Logo" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm">
              Upcoder: Your gateway to mastering modern tech skills. We provide affordable, hands-on courses and programs for career excellence.
            </p>
            <h5 className="text-md font-semibold pt-2">Connect with us</h5>
            <div className="flex space-x-4">
              {/* Ensure these links go to your actual social pages */}
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links - REVISED to focus on Learning */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Learn</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                
  
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" /> Learner Community
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Tech Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - REPLACED with Career Paths & Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Career Paths</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/paths/frontend" className="text-muted-foreground hover:text-primary transition-colors">
                  Frontend Development
                </Link>
              </li>
              <li>
                <Link href="/paths/mern" className="text-muted-foreground hover:text-primary transition-colors">
                  MERN Stack Mastery
                </Link>
              </li>
              <li>
                <Link href="/paths/ui-ux" className="text-muted-foreground hover:text-primary transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/resources/interview-prep" className="text-muted-foreground hover:text-primary transition-colors">
                  Interview Preparation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - REVISED for Digital Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support & Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <Link href="mailto:support@upcoders.vercel.app" className="text-muted-foreground hover:text-primary transition-colors text-sm">support@upcoders.com</Link>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 text-primary" />
                <Link href="/contact#technical" className="text-muted-foreground hover:text-primary transition-colors text-sm">Technical Help Center</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Upcoder. All rights reserved.</p>
          {/* Note: Kept your original creator credit, highly recommended to keep! */}
          <p className="text-muted-foreground text-sm">Develop & Design by <span className="text-primary underline underline-offset-2"><a target="_blank" href="https://samarhirau.dev/">Samar Hirau</a></span></p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Use
            </Link>
           
          </div>
        </div>
      </div>
    </footer>
  )
}
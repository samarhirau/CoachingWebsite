"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, BookOpen, Phone, Mail, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"



export function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false)
const { user  } = useAuth();


  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91-98927 62728</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>support@ridbharat.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>🎓 New Batch Starting Soon!</span>
          
<Link
  href="/courses?filter=upcoming"
  className="bg-secondary text-secondary-foreground px-3 py-2 rounded text-xs font-medium hover:bg-secondary/80 transition-colors"
>
  Register Now
</Link>

            

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">RidBharat</h1>
                <p className="text-xs text-muted-foreground">Coding Excellence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>

               <Link href="/courses" className="text-foreground hover:text-primary transition-colors">
                Courses
              </Link>
             
              
             
              



              {/* <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  Courses <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/courses/web-development">Web Development</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses/data-science">Data Science</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses/mobile-development">Mobile Development</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/courses/devops">DevOps & Cloud</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                  Programs <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/programs/bootcamp">Intensive Bootcamp</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/programs/internship">Internship Program</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/programs/mentorship">1-on-1 Mentorship</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

     <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                  {/* <span>🏢</span> */}
                  <span>Center</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link
                    href="/education/coding-classes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Coding Classes
                  </Link>
                  <Link
                    href="/education/coaching"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Professional Coaching
                  </Link>
                  <Link
                    href="/education/internships"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    Internship Programs
                  </Link>
                </div>
              </div>
              <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
                {/* <span>🖼️</span> */}
                  <span>Gallery</span>
              </Link>
              <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" size="sm">
                Free Demo
              </Button>
            {
              user ? (
                  <Button size="sm" className="gradient-primary">
                <Link href="/dashboard">
                My Courses</Link>
              </Button>
              ) : (
                <Button size="sm" className="gradient-primary">
                <Link href="/login">
                Login / Register</Link>
              </Button>
              )
            }
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/courses" className="text-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
                <Link href="/programs" className="text-foreground hover:text-primary transition-colors">
                  Programs
                </Link>
                <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
                <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Free Demo
                  </Button>
                  { User ? (
                    <Button size="sm" className="flex-1 gradient-primary">
                      <Link href="/dashboard">
                      My Courses</Link>
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1 gradient-primary">
                      <Link href="/login">
                      Login / Register</Link>
                    </Button>
                  )
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

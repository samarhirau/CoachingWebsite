"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCenterOpen, setIsCenterOpen] = useState(false)

  return (
    <>
      <div className="bg-slate-800 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-6">
              <span>Website: RID (Research Innovation & Discovery) by TWKSAA Welfare Foundation</span>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>Helpline: +91-98927 62728</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>Email: support@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#" className="hover:text-blue-300">
                Main Content
              </Link>
              <Link href="#" className="hover:text-blue-300">
                AAA+
              </Link>
              <Link href="#" className="hover:text-blue-300">
                Feedback
              </Link>
              <Link href="#" className="hover:text-blue-300">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">RID</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Research Innovation & Discovery</h1>
                <p className="text-sm text-gray-600">RID Bharat, Bhopal | नवाचार का संस्थान</p>
                <p className="text-xs text-gray-500">
                  Managed & Run by TWKSAA Welfare Foundation, Certified by Central Government
                </p>
                <p className="text-xs text-gray-500">An ISO 9001:2015 Certified Organization</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-3">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full">📋 Online Test</Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full">📚 E-Book</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full">
                📜 Certificate
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <div className="hidden lg:flex items-center justify-center space-x-8 py-4">
              <Link href="/" className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium">
                <span>🏠</span>
                <span>Home</span>
              </Link>
              <Link
                href="/research"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium"
              >
                <span>📄</span>
                <span>Research Papers</span>
              </Link>
              <Link href="/about" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                <span>👥</span>
                <span>About Us</span>
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                  <span>🏢</span>
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
              <Link
                href="/contact"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium"
              >
                <span>📞</span>
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                <Link href="/" className="block px-3 py-2 text-blue-600 font-medium">
                  🏠 Home
                </Link>
                <Link href="/research" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  📄 Research Papers
                </Link>
                <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  👥 About Us
                </Link>
                <div>
                  <button
                    onClick={() => setIsCenterOpen(!isCenterOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-blue-600"
                  >
                    🏢 Center
                    <ChevronDown className={`h-4 w-4 transition-transform ${isCenterOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isCenterOpen && (
                    <div className="pl-6 space-y-1">
                      <Link
                        href="/education/coding-classes"
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Coding Classes
                      </Link>
                      <Link
                        href="/education/coaching"
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Professional Coaching
                      </Link>
                      <Link
                        href="/education/internships"
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        Internship Programs
                      </Link>
                    </div>
                  )}
                </div>
                <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  📞 Contact Us
                </Link>
                <div className="px-3 py-2 space-y-2">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">📋 Online Test</Button>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">📚 E-Book</Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">📜 Certificate</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

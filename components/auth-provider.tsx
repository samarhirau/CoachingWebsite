// "use client"

// import React, { createContext, useContext, useEffect, useState } from "react"

// interface User {
//   id: string
//   email: string
//   phone : string
//   name: string
//   role: "admin" | "student"

// }

// interface AuthContextType {
//   setUser(arg0: null): unknown
//   user: User | null
//   loading: boolean
//   login: (email: string, password: string) => Promise<User>
//   register: (email: string, password: string, name: string , phone : string) => Promise<User>
//   logout: () => Promise<void>
//   refreshUser: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     checkAuth()
//   }, [])

// const checkAuth = async () => {
//   try {
//     const response = await fetch("/api/auth/me", {
//       method: "GET",
//       credentials: "include", 
//       cache: "no-store",
//     })

//     if (response.ok) {
//       const data = await response.json()
//       setUser(data.user)
//     } else {
//       setUser(null)
//     }
//   } catch (error) {
//     console.error("Auth check failed:", error)
//     setUser(null)
//   } finally {
//     setLoading(false)
//   }
// }


//   const login = async (email: string, password: string): Promise<User> => {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//       credentials: "include",
//       cache: "no-store",
      
//     })

//     const data = await response.json()

//     if (!response.ok) {
//       throw new Error(data.error || "Login failed")
//     }

//     setUser(data.user)
//     return data.user
//   }

//   const register = async (email: string, password: string, name: string, phone?: string): Promise<User> => {
//   const response = await fetch("/api/auth/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password, name, phone }),
//     cache: "no-store", 
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     throw new Error(data.error || "Registration failed")
//   }

//   setUser(data.user)
//   return data.user
// }

//   const logout = async () => {
//     await fetch("/api/auth/logout", { method: "POST" })
//     setUser(null)
//   }

//   const refreshUser = async () => {
//     await checkAuth()
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

// --- TYPES ---
interface User {
  id: string
  email: string
  phone: string
  name: string
  role: "admin" | "student"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string, phone: string) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// --- PROVIDER ---
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // 1. CORE FIX FUNCTION: Checks the session status on the server
  const checkAuth = useCallback(async () => {
    try {
      // NOTE: credentials: "include" sends the httpOnly cookie securely
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include", 
        cache: "no-store",
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        // Status 401 (Unauthorized) or other error means token is invalid or missing
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      setUser(null)
    } finally {
      // THIS IS CRUCIAL: Set loading to false only after the check is complete
      setLoading(false)
    }
  }, [])

  // Initial Check on Mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  // AUTH ACTIONS
  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true) // Start loading state during login attempt
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
            cache: "no-store", 
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Login failed")
        }

        setUser(data.user)
        router.push('/dashboard') // Redirect after successful login
        return data.user
    } finally {
        setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, phone: string): Promise<User> => {
    setLoading(true)
    try {
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name, phone }),
            cache: "no-store", 
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || "Registration failed")
        }
        
        // NOTE: If signup doesn't set a cookie, you need to call login here or redirect
        setUser(data.user) // Assuming your signup API returns user and sets the cookie
        router.push('/dashboard')
        return data.user
    } finally {
        setLoading(false)
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setUser(null)
    router.push('/') // Redirect to home/login after logout
  }

  const refreshUser = async () => {
    await checkAuth()
  }

  const isLoggedIn = !!user

  return (
    <AuthContext.Provider 
      value={{ user, loading, isLoggedIn, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
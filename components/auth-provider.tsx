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
//     await fetch("/api/auth/logout", { 
//   method: "POST",
//   credentials: "include",
//   cache: "no-store"
// })

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

import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: "admin" | "student"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string, phone?: string) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  // ✅ Check auth on mount or refresh
  const checkAuth = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("Auth check failed:", err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Login function
  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
      cache: "no-store",
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Login failed")

    setUser(data.user)
    return data.user
  }

  // ✅ Register function
  const register = async (email: string, password: string, name: string, phone?: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone }),
      credentials: "include",
      cache: "no-store",
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Registration failed")

    setUser(data.user)
    return data.user
  }

  // ✅ Logout function
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    })
    setUser(null)
  }

  const refreshUser = async () => checkAuth()

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

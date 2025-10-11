"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

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
  login: (email: string, password: string) => Promise<User>
  register: (email: string, password: string, name: string, phone: string) => Promise<User>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        })
        if (!res.ok) {
          setUser(null)
        } else {
          const data = await res.json()
          setUser(data.user ?? null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

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
    setUser(data.user ?? null)
    return data.user
  }

  const register = async (email: string, password: string, name: string, phone?: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, phone }),
      cache: "no-store",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Registration failed")
    setUser(data.user ?? null)
    return data.user
  }

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    setUser(null)
  }

  const refreshUser = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/me", { method: "GET", credentials: "include", cache: "no-store" })
      const data = await res.json()
      setUser(data.user ?? null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}

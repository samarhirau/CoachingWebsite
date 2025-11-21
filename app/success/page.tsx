"use client"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
  const search = useSearchParams()
  const role = search.get("redirect")

  useEffect(() => {
    if (role === "admin") {
      router.replace("/admin")
    } else {
      router.replace("/dashboard")
    }
  }, [role])

  return null
}

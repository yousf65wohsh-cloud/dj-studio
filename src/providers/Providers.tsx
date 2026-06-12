"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useThemeStore } from "@/store/themeStore"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const setTheme = useThemeStore((s) => s.setTheme)

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setTheme(saved || (prefersDark ? "dark" : "light"))
    setMounted(true)
  }, [setTheme])

  if (!mounted) return <div className="bg-black min-h-screen" />

  return <>{children}</>
}

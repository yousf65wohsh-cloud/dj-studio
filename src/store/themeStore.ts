"use client"

import { create } from "zustand"

type Theme = "light" | "dark"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "dark",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
    set({ theme })
  },
  toggleTheme: () => {
    const newTheme = get().theme === "dark" ? "light" : "dark"
    set({ theme: newTheme })
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  },
}))

function get() {
  return (useThemeStore as unknown as { getState: () => ThemeState }).getState()
}

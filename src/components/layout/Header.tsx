"use client"

import { useRouter } from "next/navigation"
import { LogOut, Moon, Sun, User as UserIcon, Settings } from "lucide-react"
import { useThemeStore } from "@/store/themeStore"
import { createClient } from "@/lib/supabase/client"
import { Avatar } from "@/components/ui/avatar"
import { Dropdown } from "@/components/ui/dropdown"
import type { User } from "@/lib/types"

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  const router = useRouter()
  const { theme, toggleTheme } = useThemeStore()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
      <div />

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user && (
          <Dropdown
            trigger={
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all">
                <Avatar src={user.avatar_url} alt={user.username} size="sm" />
                <span className="text-sm text-white/80 hidden sm:block">
                  {user.username}
                </span>
              </button>
            }
            items={[
              { label: "حسابي", icon: <UserIcon size={16} />, onClick: () => {} },
              ...(user.is_admin
                ? [{ label: "لوحة الإدارة", icon: <Settings size={16} />, onClick: () => router.push("/admin") }]
                : []),
              { label: "تسجيل الخروج", icon: <LogOut size={16} />, onClick: handleLogout, danger: true },
            ]}
            align="left"
          />
        )}
      </div>
    </header>
  )
}

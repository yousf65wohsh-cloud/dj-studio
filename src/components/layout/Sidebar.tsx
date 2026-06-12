"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Library,
  Disc3,
  ListMusic,
  Heart,
  Home,
  Plus,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { APP_NAME } from "@/lib/constants"

const navItems = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "المكتبة", href: "/library", icon: Library },
  { label: "الألبومات", href: "/albums", icon: Disc3 },
  { label: "قوائم التشغيل", href: "/playlists", icon: ListMusic },
  { label: "المفضلة", href: "/favorites", icon: Heart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col w-64 h-full bg-black/40 backdrop-blur-xl border-l border-white/5">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Disc3 size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">{APP_NAME}</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium">
          <Plus size={18} />
          إضافة أغنية
        </button>
      </div>
    </aside>
  )
}

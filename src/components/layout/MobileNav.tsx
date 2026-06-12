"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Library, Disc3, ListMusic, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "المكتبة", href: "/library", icon: Library },
  { label: "الألبومات", href: "/albums", icon: Disc3 },
  { label: "القوائم", href: "/playlists", icon: ListMusic },
  { label: "المفضلة", href: "/favorites", icon: Heart },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-t border-white/10 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all",
                isActive ? "text-white" : "text-white/40"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

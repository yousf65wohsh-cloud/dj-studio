"use client"

import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-white/10 flex-shrink-0",
        {
          "h-8 w-8": size === "sm",
          "h-10 w-10": size === "md",
          "h-16 w-16": size === "lg",
        },
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white/50 text-sm font-medium">
          {alt.charAt(0).toUpperCase() || "?"}
        </div>
      )}
    </div>
  )
}

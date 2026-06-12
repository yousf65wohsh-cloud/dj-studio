"use client"

import { cn } from "@/lib/utils"

interface SliderProps {
  value: number
  max: number
  onChange: (value: number) => void
  className?: string
  size?: "sm" | "md"
}

export function Slider({ value, max, onChange, className, size = "md" }: SliderProps) {
  const percent = max > 0 ? (value / max) * 100 : 0

  return (
    <div className={cn("relative group", className)}>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "w-full appearance-none bg-transparent cursor-pointer",
          "[&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/20",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:group-hover:opacity-100 [&::-webkit-slider-thumb]:transition-opacity",
          size === "sm"
            ? "h-1 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3"
            : "h-1.5 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          className
        )}
        style={{
          background: `linear-gradient(to right, rgb(255 255 255 / 0.8) ${percent}%, rgb(255 255 255 / 0.2) ${percent}%)`,
          borderRadius: "9999px",
        }}
      />
    </div>
  )
}

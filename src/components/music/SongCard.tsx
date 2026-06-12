"use client"

import { Play, Heart, MoreHorizontal, Music2 } from "lucide-react"
import { usePlayerStore } from "@/store/playerStore"
import { formatDuration, cn } from "@/lib/utils"
import type { Song } from "@/lib/types"

interface SongCardProps {
  song: Song
  isFavorite?: boolean
  onToggleFavorite?: () => void
  onDelete?: () => void
  allSongs?: Song[]
}

export function SongCard({
  song,
  isFavorite,
  onToggleFavorite,
  onDelete,
  allSongs,
}: SongCardProps) {
  const { setQueue, setCurrentSong, currentSong, isPlaying, togglePlay } =
    usePlayerStore()

  const isCurrentSong = currentSong?.id === song.id

  const handlePlay = () => {
    if (allSongs) {
      const index = allSongs.findIndex((s) => s.id === song.id)
      setQueue(allSongs, index)
    } else {
      setCurrentSong(song)
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer",
        isCurrentSong
          ? "bg-white/10"
          : "hover:bg-white/5"
      )}
      onClick={handlePlay}
    >
      <div className="relative flex-shrink-0">
        {song.cover_url ? (
          <img
            src={song.cover_url}
            alt={song.title}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
            <Music2 size={20} className="text-white/40" />
          </div>
        )}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
            isCurrentSong && isPlaying && "opacity-100"
          )}
        >
          {isCurrentSong && isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-0.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms", height: "60%" }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms", height: "100%" }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms", height: "40%" }} />
            </div>
          ) : (
            <Play size={16} className="text-white" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium truncate",
            isCurrentSong ? "text-blue-400" : "text-white"
          )}
        >
          {song.title}
        </p>
        <p className="text-xs text-white/50 truncate">
          {song.artist || "فنان غير معروف"}
          {song.album && ` • ${song.album}`}
        </p>
      </div>

      <span className="text-xs text-white/40 hidden sm:block" dir="ltr">
        {formatDuration(song.duration)}
      </span>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center transition-all",
              isFavorite
                ? "text-red-400 hover:text-red-300"
                : "text-white/40 hover:text-white"
            )}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>
    </div>
  )
}

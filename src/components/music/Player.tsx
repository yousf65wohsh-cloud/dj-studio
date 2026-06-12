"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Volume2,
  VolumeX,
} from "lucide-react"
import { usePlayerStore } from "@/store/playerStore"
import { Slider } from "@/components/ui/slider"
import { formatDuration } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Queue } from "./Queue"

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [showQueue, setShowQueue] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showVolume, setShowVolume] = useState(false)

  const {
    currentSong,
    isPlaying,
    volume,
    repeatMode,
    isShuffled,
    queue,
    progress,
    setProgress,
    setDuration,
    setIsPlaying,
    setVolume,
    nextSong,
    prevSong,
    toggleShuffle,
    setRepeatMode,
    isPlayerVisible,
  } = usePlayerStore()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    const audio = audioRef.current

    if (currentSong) {
      const supabase = createClient()
      const { data } = supabase.storage.from("songs").getPublicUrl(currentSong.file_path)
      audio.src = data.publicUrl
      audio.load()
      if (isPlaying) audio.play().catch(() => {})

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentSong.title,
          artist: currentSong.artist || "DJ Studio",
          album: currentSong.album || "",
          artwork: currentSong.cover_url
            ? [{ src: currentSong.cover_url, sizes: "512x512", type: "image/*" }]
            : [],
        })
        navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true))
        navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false))
        navigator.mediaSession.setActionHandler("nexttrack", () => nextSong())
        navigator.mediaSession.setActionHandler("previoustrack", () => prevSong())
      }
    }

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [currentSong?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSong?.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (audio) setProgress(audio.currentTime)
  }, [setProgress])

  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current
    if (audio) setDuration(audio.duration)
  }, [setDuration])

  const handleEnded = useCallback(() => {
    nextSong()
  }, [nextSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded])

  const handleSeek = (value: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = value
      setProgress(value)
    }
  }

  const toggleRepeat = () => {
    if (repeatMode === "off") setRepeatMode("all")
    else if (repeatMode === "all") setRepeatMode("one")
    else setRepeatMode("off")
  }

  if (!isPlayerVisible || !currentSong) return null

  const duration = audioRef.current?.duration || 0

  return (
    <>
      {isMobile && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 pb-2 pt-3">
          <Slider
            value={progress}
            max={duration}
            onChange={handleSeek}
            size="sm"
            className="mb-3"
          />
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-white/50 truncate">
                {currentSong.artist || "DJ Studio"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={prevSong} className="text-white/70 hover:text-white">
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="mr-0.5" />}
              </button>
              <button onClick={nextSong} className="text-white/70 hover:text-white">
                <SkipForward size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="hidden md:block fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center gap-6 px-6 py-3 max-w-screen-2xl mx-auto w-full">
            <div className="flex items-center gap-4 w-72">
              {currentSong.cover_url ? (
                <img
                  src={currentSong.cover_url}
                  alt={currentSong.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />
              ) : (
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center">
                  <ListMusic size={22} className="text-white/50" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {currentSong.title}
                </p>
                <p className="text-xs text-white/50 truncate">
                  {currentSong.artist || "فنان غير معروف"}
                </p>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-5 mb-1">
                <button
                  onClick={toggleShuffle}
                  className={cn(
                    "transition-colors",
                    isShuffled ? "text-blue-400" : "text-white/50 hover:text-white"
                  )}
                >
                  <Shuffle size={18} />
                </button>
                <button
                  onClick={prevSong}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-black hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="mr-0.5" />}
                </button>
                <button
                  onClick={nextSong}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipForward size={20} />
                </button>
                <button
                  onClick={toggleRepeat}
                  className={cn(
                    "transition-colors",
                    repeatMode !== "off" ? "text-blue-400" : "text-white/50 hover:text-white"
                  )}
                >
                  {repeatMode === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-10 text-left" dir="ltr">
                  {formatDuration(progress)}
                </span>
                <Slider
                  value={progress}
                  max={duration}
                  onChange={handleSeek}
                  size="sm"
                  className="flex-1"
                />
                <span className="text-xs text-white/40 w-10 text-right" dir="ltr">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-72 justify-end">
              <button
                onClick={() => setShowQueue(!showQueue)}
                className={cn(
                  "transition-colors",
                  showQueue ? "text-blue-400" : "text-white/50 hover:text-white"
                )}
              >
                <ListMusic size={18} />
              </button>
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <div className="w-24">
                  <Slider value={volume} max={1} onChange={setVolume} size="sm" />
                </div>
              </div>
            </div>
          </div>

          {showQueue && <Queue onClose={() => setShowQueue(false)} />}
        </div>
      )}
    </>
  )
}

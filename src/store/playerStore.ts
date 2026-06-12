"use client"

import { create } from "zustand"
import type { Song, RepeatMode, QueueItem } from "@/lib/types"

interface PlayerState {
  currentSong: Song | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
  repeatMode: RepeatMode
  isShuffled: boolean
  queue: QueueItem[]
  originalQueue: QueueItem[]
  isPlayerVisible: boolean

  setCurrentSong: (song: Song) => void
  setIsPlaying: (playing: boolean) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  setDuration: (duration: number) => void
  setRepeatMode: (mode: RepeatMode) => void
  toggleShuffle: () => void
  setQueue: (songs: Song[], startIndex?: number) => void
  addToQueue: (song: Song) => void
  removeFromQueue: (queueId: string) => void
  clearQueue: () => void
  nextSong: () => void
  prevSong: () => void
  showPlayer: () => void
  hidePlayer: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  volume: 0.8,
  progress: 0,
  duration: 0,
  repeatMode: "off",
  isShuffled: false,
  queue: [],
  originalQueue: [],
  isPlayerVisible: false,

  setCurrentSong: (song) => set({ currentSong: song, isPlaying: true, isPlayerVisible: true }),

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setVolume: (volume) => set({ volume }),

  setProgress: (progress) => set({ progress }),

  setDuration: (duration) => set({ duration }),

  setRepeatMode: (mode) => set({ repeatMode: mode }),

  toggleShuffle: () => {
    const { isShuffled, queue, originalQueue, currentSong } = get()
    if (isShuffled) {
      set({ isShuffled: false, queue: originalQueue })
    } else {
      const withoutCurrent = originalQueue.filter((q) => q.song.id !== currentSong?.id)
      const shuffled = [...withoutCurrent].sort(() => Math.random() - 0.5)
      if (currentSong) {
        shuffled.unshift({ song: currentSong, queueId: currentSong.id })
      }
      set({ isShuffled: true, queue: shuffled })
    }
  },

  setQueue: (songs, startIndex = 0) => {
    const queue = songs.map((song) => ({ song, queueId: crypto.randomUUID() }))
    const reordered = [
      ...queue.slice(startIndex),
      ...queue.slice(0, startIndex),
    ]
    set({
      queue: reordered,
      originalQueue: reordered,
      currentSong: songs[startIndex],
      isPlaying: true,
      isPlayerVisible: true,
      progress: 0,
    })
  },

  addToQueue: (song) =>
    set((state) => ({
      queue: [...state.queue, { song, queueId: crypto.randomUUID() }],
      originalQueue: [...state.originalQueue, { song, queueId: crypto.randomUUID() }],
    })),

  removeFromQueue: (queueId) =>
    set((state) => ({
      queue: state.queue.filter((q) => q.queueId !== queueId),
      originalQueue: state.originalQueue.filter((q) => q.queueId !== queueId),
    })),

  clearQueue: () => set({ queue: [], originalQueue: [], currentSong: null, isPlaying: false }),

  nextSong: () => {
    const { queue, repeatMode, currentSong } = get()
    const currentIndex = queue.findIndex((q) => q.song.id === currentSong?.id)

    if (repeatMode === "one") {
      set({ progress: 0 })
      return
    }

    if (currentIndex < queue.length - 1) {
      const next = queue[currentIndex + 1]
      set({ currentSong: next.song, isPlaying: true, progress: 0 })
    } else if (repeatMode === "all") {
      const next = queue[0]
      set({ currentSong: next.song, isPlaying: true, progress: 0 })
    } else {
      set({ isPlaying: false })
    }
  },

  prevSong: () => {
    const { queue, progress, currentSong } = get()
    if (progress > 3) {
      set({ progress: 0 })
      return
    }
    const currentIndex = queue.findIndex((q) => q.song.id === currentSong?.id)
    if (currentIndex > 0) {
      const prev = queue[currentIndex - 1]
      set({ currentSong: prev.song, isPlaying: true, progress: 0 })
    }
  },

  showPlayer: () => set({ isPlayerVisible: true }),
  hidePlayer: () => set({ isPlayerVisible: false }),
}))

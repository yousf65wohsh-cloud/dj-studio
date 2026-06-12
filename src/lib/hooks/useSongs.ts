"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Song } from "@/lib/types"

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchSongs = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }

    const { data } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    setSongs(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSongs()
  }, [fetchSongs])

  const deleteSong = async (songId: string) => {
    const song = songs.find((s) => s.id === songId)
    if (!song) return

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.storage.from("songs").remove([song.file_path])
    await supabase.from("songs").delete().eq("id", songId)
    setSongs((prev) => prev.filter((s) => s.id !== songId))
  }

  return { songs, loading, fetchSongs, deleteSong }
}

export interface User {
  id: string
  email: string
  username: string
  avatar_url?: string
  created_at: string
  is_admin?: boolean
  storage_used?: number
  storage_limit?: number
}

export interface Song {
  id: string
  user_id: string
  title: string
  artist?: string
  album?: string
  genre?: string
  duration: number
  file_path: string
  file_size: number
  file_type: string
  cover_url?: string
  play_count: number
  created_at: string
  updated_at: string
}

export interface Album {
  id: string
  user_id: string
  title: string
  description?: string
  cover_url?: string
  created_at: string
  updated_at: string
  song_count?: number
  total_duration?: number
}

export interface AlbumSong {
  id: string
  album_id: string
  song_id: string
  position: number
  created_at: string
  song?: Song
}

export interface Playlist {
  id: string
  user_id: string
  title: string
  description?: string
  cover_url?: string
  created_at: string
  updated_at: string
  song_count?: number
}

export interface PlaylistSong {
  id: string
  playlist_id: string
  song_id: string
  position: number
  created_at: string
  song?: Song
}

export interface Favorite {
  id: string
  user_id: string
  song_id: string
  created_at: string
  song?: Song
}

export interface PlayHistory {
  id: string
  user_id: string
  song_id: string
  played_at: string
  song?: Song
}

export type RepeatMode = 'off' | 'all' | 'one'

export interface QueueItem {
  song: Song
  queueId: string
}

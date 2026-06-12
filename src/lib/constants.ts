export const APP_NAME = "DJ Studio"
export const APP_DESCRIPTION = "منصة الموسيقى الشخصية الخاصة بك"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const SUPPORTED_AUDIO_FORMATS = ["mp3", "wav", "flac", "m4a", "aac"]
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
export const MAX_STORAGE_PER_USER = 500 * 1024 * 1024 // 500MB

export const STORAGE_BUCKETS = {
  SONGS: "songs",
  COVERS: "covers",
  AVATARS: "avatars",
} as const

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET_PASSWORD: "/reset-password",
  LIBRARY: "/library",
  ALBUMS: "/albums",
  ALBUM: (id: string) => `/albums/${id}`,
  PLAYLISTS: "/playlists",
  PLAYLIST: (id: string) => `/playlists/${id}`,
  FAVORITES: "/favorites",
  ADMIN: "/admin",
} as const

export const SORT_OPTIONS = {
  NAME_ASC: { label: "الاسم (أ-ي)", value: "title-asc" },
  NAME_DESC: { label: "الاسم (ي-أ)", value: "title-desc" },
  DATE_ASC: { label: "الأقدم", value: "date-asc" },
  DATE_DESC: { label: "الأحدث", value: "date-desc" },
} as const

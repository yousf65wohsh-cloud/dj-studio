import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: songs } = await supabase
    .from("songs")
    .select("file_size")
    .eq("user_id", user.id)

  const totalBytes = songs?.reduce((acc, s) => acc + s.file_size, 0) || 0

  return NextResponse.json({
    used: totalBytes,
    limit: 500 * 1024 * 1024,
    songs: songs?.length || 0,
  })
}

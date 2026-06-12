"use client"

import { X, Music2, Trash2 } from "lucide-react"
import { usePlayerStore } from "@/store/playerStore"
import { formatDuration } from "@/lib/utils"

interface QueueProps {
  onClose: () => void
}

export function Queue({ onClose }: QueueProps) {
  const { queue, currentSong, setCurrentSong, removeFromQueue } = usePlayerStore()

  return (
    <div className="fixed bottom-20 right-6 w-80 max-h-96 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white">قائمة الانتظار</h3>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
      <div className="overflow-y-auto max-h-72">
        {queue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-white/30">
            <Music2 size={32} />
            <p className="text-sm mt-2">قائمة الانتظار فارغة</p>
          </div>
        ) : (
          queue.map((item) => (
            <div
              key={item.queueId}
              className={`flex items-center gap-3 px-4 py-2.5 transition-colors cursor-pointer group ${
                currentSong?.id === item.song.id
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5"
              }`}
              onClick={() => setCurrentSong(item.song)}
            >
              <div className="h-8 w-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                <Music2 size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{item.song.title}</p>
                <p className="text-xs text-white/40 truncate">
                  {item.song.artist || "فنان غير معروف"}
                </p>
              </div>
              <span className="text-xs text-white/40" dir="ltr">
                {formatDuration(item.song.duration)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFromQueue(item.queueId)
                }}
                className="text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

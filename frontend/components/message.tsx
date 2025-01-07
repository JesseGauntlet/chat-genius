import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Smile, MessageSquare, MoreHorizontal } from 'lucide-react'

interface MessageProps {
  avatar?: string
  username: string
  timestamp: string
  content: string
  isPinned?: boolean
  reactions?: Array<{
    emoji: string
    count: number
  }>
}

export function Message({
  avatar,
  username,
  timestamp,
  content,
  isPinned,
  reactions
}: MessageProps) {
  return (
    <div className="group px-4 py-2 hover:bg-slate-50">
      <div className="flex items-start space-x-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src={avatar} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{username}</span>
            <span className="text-sm text-muted-foreground">{timestamp}</span>
            {isPinned && (
              <div className="flex items-center text-xs text-muted-foreground">
                <span>📌 Pinned by {username}</span>
              </div>
            )}
          </div>
          <div className="text-sm">{content}</div>
          {reactions && reactions.length > 0 && (
            <div className="flex gap-2 mt-2">
              {reactions.map((reaction, index) => (
                <button
                  key={index}
                  className="inline-flex items-center space-x-1 rounded-full bg-slate-100 px-2 py-1 text-sm hover:bg-slate-200"
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.count}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Smile className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}


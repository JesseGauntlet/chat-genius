'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Link, List, ListOrdered, AtSign, Smile, Paperclip, Mic, Send } from 'lucide-react'
import { useState } from "react"

interface MessageInputProps {
  onSendMessage: (message: string) => void
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
          <Bold className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
          <Italic className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
          <Link className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
          <List className="w-4 h-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message #channel"
            className="min-h-[120px] max-h-[300px] resize-none pr-10"
            rows={4}
          />
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
              <AtSign className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
              <Smile className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="w-8 h-8">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button type="submit" className="self-end">
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
  )
}


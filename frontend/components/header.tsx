'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  chatName: string
}

export function Header({ chatName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b">
      <div className="font-semibold">{chatName}</div>
      <div className="relative flex-1 max-w-xl mx-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search Slack Clone"
          className="pl-8 bg-gray-100 border-none"
        />
      </div>
      <Avatar className="h-8 w-8">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  )
}


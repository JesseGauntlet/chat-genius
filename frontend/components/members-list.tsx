'use client'

import { Search, UserPlus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Member {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
  role?: string
}

interface MembersListProps {
  members: Member[]
  open: boolean
  onClose: () => void
}

export function MembersList({ members, open, onClose }: MembersListProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Members
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Find members"
              className="pl-8"
            />
          </div>
          <Button variant="outline" className="w-full justify-start space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Add people</span>
          </Button>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{member.name}</span>
                        {member.role && (
                          <span className="text-xs text-muted-foreground">
                            {member.role}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'online' ? 'bg-green-500' :
                            member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-300'
                          }`}
                        />
                        <span className="text-sm text-muted-foreground capitalize">
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}


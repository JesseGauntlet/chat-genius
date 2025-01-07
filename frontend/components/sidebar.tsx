'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Hash, Plus, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Channel {
  id: string
  name: string
}

interface DirectMessage {
  id: string
  name: string
  avatar?: string
  status: 'online' | 'offline' | 'away'
}

const channels: Channel[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'random' },
]

const directMessages: DirectMessage[] = [
  { id: '1', name: 'John Smith', status: 'online' },
  { id: '2', name: 'Jane Doe', status: 'away' },
  { id: '3', name: 'Bob Wilson', status: 'offline' },
  { id: '4', name: 'Alice Brown', status: 'online' },
  { id: '5', name: 'Sam Taylor', status: 'away' },
]

interface SidebarProps {
  onSelectChannel: (channelId: string) => void
  onSelectDM: (dmId: string) => void
}

export function Sidebar({ onSelectChannel, onSelectDM }: SidebarProps) {
  const [channelsCollapsed, setChannelsCollapsed] = useState(false)
  const [directMessagesCollapsed, setDirectMessagesCollapsed] = useState(false)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const handleChannelClick = (channelId: string) => {
    setActiveItemId(channelId)
    onSelectChannel(channelId)
  }

  const handleDMClick = (dmId: string) => {
    setActiveItemId(dmId)
    onSelectDM(dmId)
  }

  return (
    <div className="flex flex-col w-60 bg-[#3F0E40] text-white h-screen">
      <div className="p-4 border-b border-[#522653] flex items-center">
        <h1 className="text-lg font-semibold flex-1">Slack Clone</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>John Doe</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          <div className="space-y-2">
            <button 
              className="flex items-center justify-between w-full p-2 rounded hover:bg-[#522653] group"
              onClick={() => setChannelsCollapsed(!channelsCollapsed)}
            >
              <div className="flex items-center space-x-2">
                {channelsCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>Channels</span>
              </div>
            </button>
            {!channelsCollapsed && (
              <>
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`flex items-center w-full p-2 space-x-2 rounded hover:bg-[#522653] group ${
                      activeItemId === channel.id ? 'bg-[#522653]' : ''
                    }`}
                    onClick={() => handleChannelClick(channel.id)}
                  >
                    <Hash className="w-4 h-4 text-slate-400" />
                    <span>{channel.name}</span>
                  </button>
                ))}
                <button className="flex items-center w-full p-2 space-x-2 rounded hover:bg-[#522653] group opacity-60">
                  <Plus className="w-4 h-4" />
                  <span>Add channels</span>
                </button>
              </>
            )}
          </div>
          <div className="mt-4 space-y-2">
            <button 
              className="flex items-center justify-between w-full p-2 rounded hover:bg-[#522653] group"
              onClick={() => setDirectMessagesCollapsed(!directMessagesCollapsed)}
            >
              <div className="flex items-center space-x-2">
                {directMessagesCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                <span>Direct messages</span>
              </div>
            </button>
            {!directMessagesCollapsed && (
              <>
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    className={`flex items-center w-full p-2 space-x-2 rounded hover:bg-[#522653] group ${
                      activeItemId === dm.id ? 'bg-[#522653]' : ''
                    }`}
                    onClick={() => handleDMClick(dm.id)}
                  >
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={dm.avatar} />
                      <AvatarFallback>{dm.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{dm.name}</span>
                    <div className={`w-2 h-2 rounded-full ml-auto ${
                      dm.status === 'online' ? 'bg-green-500' : 
                      dm.status === 'away' ? 'bg-yellow-500' : 'bg-slate-500'
                    }`} />
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}


"use client";
import Image from "next/image";
import { useState } from "react";

import { ChatListProps } from "@/interface";

const mockChats: any[] = [
  {
    id: "1",
    name: "أحمد محمد",
    avatar: "/testImages/user.png",
    lastMessage: "مرحباً! كيف حالك؟",
    lastMessageTime: "2:30 م",
    unreadCount: 3,
    isOnline: true,
    status: "online",
  },
  {
    id: "2",
    name: "سارة أحمد",
    avatar: "/testImages/user.png",
    lastMessage: "شكراً لك على المساعدة",
    lastMessageTime: "1:45 م",
    unreadCount: 0,
    isOnline: false,
    status: "offline",
  },
  {
    id: "3",
    name: "محمد علي",
    avatar: "/testImages/user.png",
    lastMessage: "هل يمكننا الاجتماع غداً؟",
    lastMessageTime: "12:20 م",
    unreadCount: 1,
    isOnline: true,
    status: "away",
  },
  {
    id: "4",
    name: "فاطمة حسن",
    avatar: "/testImages/user.png",
    lastMessage: "أرسلت لك الملف المطلوب",
    lastMessageTime: "أمس",
    unreadCount: 0,
    isOnline: false,
    status: "offline",
  },
  {
    id: "5",
    name: "علي محمود",
    avatar: "/testImages/user.png",
    lastMessage: "ممتاز! شكراً لك",
    lastMessageTime: "أمس",
    unreadCount: 0,
    isOnline: true,
    status: "online",
  },
];

export default function ChatList({ onChatSelect }: ChatListProps) {
  const [chats, setChats] = useState<any[]>(mockChats);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (time: string) => {
    if (time === "أمس") return time;
    return time;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onChatSelect(chat)}
          className="flex items-center p-4 hover:bg-theme-bg-hover cursor-pointer transition-colors duration-200 border-b border-theme-border-primary last:border-b-0"
        >
          {/* Avatar with online status */}
          <div className="relative mr-3">
            <Image
              src={chat.avatar}
              alt={chat.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-bookik-rounded-full object-cover border-2 border-theme-border-primary"
            />
            {chat.isOnline && (
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-bookik-rounded-full border-2 border-theme-bg-card ${
                  chat.status === "online"
                    ? "bg-theme-accent-success"
                    : chat.status === "away"
                    ? "bg-theme-accent-warning"
                    : "bg-theme-text-muted"
                }`}
              />
            )}
          </div>

          {/* Chat info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-text5 font-medium text-theme-text-primary truncate">
                {chat.name}
              </h3>
              <span className="text-text7 text-theme-text-secondary text-xs">
                {formatTime(chat.lastMessageTime)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-text6 text-theme-text-secondary truncate flex-1">
                {chat.lastMessage}
              </p>
              {chat.unreadCount > 0 && (
                <span className="ml-2 bg-theme-accent-primary text-theme-text-inverse text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {filteredChats.length === 0 && (
        <div className="flex items-center justify-center h-32 text-theme-text-secondary">
          <p className="text-text6 text-theme-text-muted">لا توجد محادثات</p>
        </div>
      )}
    </div>
  );
}

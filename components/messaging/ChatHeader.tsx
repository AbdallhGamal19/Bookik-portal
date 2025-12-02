"use client";
import Image from "next/image";
import { FaArrowLeft, FaEllipsisV } from "react-icons/fa";

import { ChatHeaderProps } from "@/interface";

export default function ChatHeader({
  chat,
  onBack,
  showBackButton = false,
}: ChatHeaderProps) {
  const getStatusText = (status?: string, isOnline?: boolean) => {
    if (!isOnline) return "غير متصل";
    switch (status) {
      case "online":
        return "متصل الآن";
      case "away":
        return "بعيد";
      default:
        return "متصل الآن";
    }
  };

  const getStatusColor = (status?: string, isOnline?: boolean) => {
    if (!isOnline) return "bg-theme-text-muted";
    switch (status) {
      case "online":
        return "bg-theme-accent-success";
      case "away":
        return "bg-theme-accent-warning";
      default:
        return "bg-theme-accent-success";
    }
  };

  return (
    <div className="flex items-center p-4 border-b border-theme-border-primary bg-theme-bg-card">
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="mr-3 p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg transition-colors duration-200"
        >
          <FaArrowLeft className="text-theme-text-primary" />
        </button>
      )}

      <div className="relative mr-3">
        <Image
          src={chat.avatar}
          alt={chat.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-bookik-rounded-full object-cover border-2 border-theme-border-primary"
        />
        {chat.isOnline && (
          <div
            className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-bookik-rounded-full border-2 border-theme-bg-card ${getStatusColor(
              chat.status,
              chat.isOnline
            )}`}
          />
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-text5 font-medium text-theme-text-primary">
          {chat.name}
        </h3>
        <p className="text-text7 text-theme-text-secondary text-xs">
          {getStatusText(chat.status, chat.isOnline)}
        </p>
      </div>

      <button className="p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg transition-colors duration-200">
        <FaEllipsisV className="text-theme-text-secondary hover:text-theme-text-primary" />
      </button>
    </div>
  );
}

"use client";

import { MessageBubbleProps } from "@/interface";

export default function MessageBubble({
  message,
  isCurrentUser,
}: MessageBubbleProps) {
  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;

    return timestamp.toLocaleDateString("ar-SA");
  };

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-bookik-rounded-2xl ${
          isCurrentUser
            ? "bg-theme-accent-primary text-theme-text-inverse rounded-br-bookik-rounded-md"
            : "bg-theme-bg-hover text-theme-text-primary rounded-bl-bookik-rounded-md"
        }`}
      >
        <p className="text-text6 leading-relaxed">{message.content}</p>
        <div
          className={`flex items-center justify-end mt-2 ${
            isCurrentUser
              ? "text-theme-text-inverse/70"
              : "text-theme-text-secondary"
          }`}
        >
          <span className="text-xs">
            {formatMessageTime(message.timestamp)}
          </span>
          {isCurrentUser && (
            <span className="mr-2 text-xs">{message.isRead ? "✓✓" : "✓"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

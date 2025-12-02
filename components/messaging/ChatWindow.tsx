"use client";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

import { ChatWindowProps } from "@/interface";

const mockMessages: any[] = [
  {
    id: "1",
    senderId: "currentUser",
    receiverId: "1",
    content: "مرحباً! كيف حالك؟",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: true,
    messageType: "text",
  },
  {
    id: "2",
    senderId: "1",
    receiverId: "currentUser",
    content: "أهلاً وسهلاً! الحمد لله، أنا بخير. وأنت؟",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    isRead: true,
    messageType: "text",
  },
];

export default function ChatWindow({
  chat,
  onBack,
  isMobile,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<any[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText: string) => {
    const message: any = {
      id: Date.now().toString(),
      senderId: "currentUser",
      receiverId: chat.id,
      content: messageText,
      timestamp: new Date(),
      isRead: false,
      messageType: "text",
    };

    setMessages((prev) => [...prev, message]);

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      // Simulate reply
      const reply: any = {
        id: (Date.now() + 1).toString(),
        senderId: chat.id,
        receiverId: "currentUser",
        content: "تم استلام رسالتك! سأرد عليك قريباً.",
        timestamp: new Date(),
        isRead: false,
        messageType: "text",
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  const isCurrentUser = (senderId: string) => senderId === "currentUser";

  return (
    <div className="flex flex-col h-full bg-theme-bg-primary">
      {/* Chat Header */}
      <ChatHeader
        chat={chat}
        onBack={isMobile ? onBack : undefined}
        showBackButton={isMobile}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={isCurrentUser(message.senderId)}
          />
        ))}

        <TypingIndicator isVisible={isTyping} />

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

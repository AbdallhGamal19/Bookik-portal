"use client";
import ChatList from "@/components/messaging/ChatList";
import ChatWindow from "@/components/messaging/ChatWindow";
import NewChat from "@/components/messaging/NewChat";
import { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
  };

  const handleBackToChats = () => {
    setSelectedChat(null);
  };

  const handleStartNewChat = (userId: string) => {
    // In a real app, you would create a new chat here
    // For now, we'll just close the modal
  };

  return (
    <div className="flex h-full bg-theme-bg-primary">
      {/* Chat List Sidebar */}
      <div
        className={`${
          selectedChat && isMobile ? "hidden" : "flex"
        } flex-col w-full md:w-80 lg:w-96 border-r border-theme-border-primary bg-theme-bg-card`}
      >
        <div className="p-4 border-b border-theme-border-primary bg-theme-bg-card">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-text3 font-semibold text-theme-text-primary">
              الرسائل
            </h1>
            <button
              onClick={() => setShowNewChat(true)}
              className="p-2 bg-theme-accent-primary text-theme-text-inverse rounded-full hover:bg-theme-accent-primary/90 transition-colors"
            >
              <FaPlus className="text-sm" />
            </button>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-secondary" />
            <input
              type="text"
              placeholder="البحث في المحادثات..."
              className="w-full pl-10 pr-4 py-2 bg-theme-bg-input rounded-lg text-theme-text-primary placeholder-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-accent-primary/20"
            />
          </div>
        </div>
        <ChatList onChatSelect={handleChatSelect} />
      </div>

      {/* Chat Window */}
      <div
        className={`${
          !selectedChat && isMobile ? "hidden" : "flex"
        } flex-col flex-1 bg-theme-bg-primary`}
      >
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onBack={handleBackToChats}
            isMobile={isMobile}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-theme-text-secondary">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-theme-bg-tertiary rounded-full flex items-center justify-center">
                <FaSearch className="text-4xl text-theme-text-muted" />
              </div>
              <h3 className="text-text4 font-medium text-theme-text-primary mb-2">
                اختر محادثة
              </h3>
              <p className="text-text6 text-theme-text-secondary">
                ابدأ محادثة جديدة أو اختر من المحادثات الموجودة
              </p>
              <button
                onClick={() => setShowNewChat(true)}
                className="mt-4 px-6 py-2 bg-theme-accent-primary text-theme-text-inverse rounded-lg hover:bg-theme-accent-primary/90 transition-colors"
              >
                بدء محادثة جديدة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <NewChat
          onClose={() => setShowNewChat(false)}
          onStartChat={handleStartNewChat}
        />
      )}
    </div>
  );
}

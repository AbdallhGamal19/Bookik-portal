"use client";
import React, { useState } from "react";
import {
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
} from "react-icons/fa";

import { ChatInputProps } from "@/interface";

export default function ChatInput({
  onSendMessage,
  placeholder = "اكتب رسالة...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-theme-border-primary bg-theme-bg-card">
      <div className="flex items-center space-x-2 space-x-reverse">
        <button className="p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg transition-colors duration-200">
          <FaSmile className="text-theme-text-secondary hover:text-theme-text-primary" />
        </button>

        <button className="p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg transition-colors duration-200">
          <FaPaperclip className="text-theme-text-secondary hover:text-theme-text-primary" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-theme-bg-input rounded-bookik-rounded-full text-theme-text-primary placeholder-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-accent-primary/20 transition-all duration-200"
          />
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          className="p-3 bg-theme-accent-primary text-theme-text-inverse rounded-bookik-rounded-full hover:bg-theme-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
        >
          <FaPaperPlane className="text-sm" />
        </button>

        <button className="p-3 bg-theme-bg-input text-theme-text-secondary rounded-bookik-rounded-full hover:bg-theme-bg-hover transition-all duration-200 transform hover:scale-105">
          <FaMicrophone className="text-sm" />
        </button>
      </div>
    </div>
  );
}

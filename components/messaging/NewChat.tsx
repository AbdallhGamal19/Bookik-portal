"use client";
import React, { useState } from "react";
import { FaSearch, FaUserPlus, FaTimes } from "react-icons/fa";
import Image from "next/image";

import { NewChatProps } from "@/interface";

const mockUsers = [
  {
    id: "1",
    name: "أحمد محمد",
    avatar: "/testImages/user.png",
    isOnline: true,
  },
  {
    id: "2",
    name: "سارة أحمد",
    avatar: "/testImages/user.png",
    isOnline: false,
  },
  { id: "3", name: "محمد علي", avatar: "/testImages/user.png", isOnline: true },
  {
    id: "4",
    name: "فاطمة حسن",
    avatar: "/testImages/user.png",
    isOnline: false,
  },
  {
    id: "5",
    name: "علي محمود",
    avatar: "/testImages/user.png",
    isOnline: true,
  },
];

export default function NewChat({ onClose, onStartChat }: NewChatProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleStartChat = () => {
    if (selectedUsers.length > 0) {
      onStartChat(selectedUsers[0]); // For now, just start with first selected user
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-theme-bg-overlay flex items-center justify-center z-50">
      <div className="bg-theme-bg-card rounded-bookik-rounded-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-theme-border-primary">
          <h2 className="text-text4 font-semibold text-theme-text-primary">
            محادثة جديدة
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg transition-colors"
          >
            <FaTimes className="text-theme-text-secondary" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-theme-border-primary">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="البحث عن مستخدمين..."
              className="w-full pl-10 pr-4 py-2 bg-theme-bg-input rounded-bookik-rounded-lg text-theme-text-primary placeholder-theme-text-muted focus:outline-none focus:ring-2 focus:ring-theme-accent-primary/20"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => toggleUserSelection(user.id)}
              className={`flex items-center p-4 hover:bg-theme-bg-hover cursor-pointer transition-colors ${
                selectedUsers.includes(user.id)
                  ? "bg-theme-accent-primary/10"
                  : ""
              }`}
            >
              <div className="relative mr-3">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-bookik-rounded-full object-cover border-2 border-theme-border-primary"
                />
                {user.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-theme-accent-success rounded-bookik-rounded-full border-2 border-theme-bg-card" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-text5 font-medium text-theme-text-primary">
                  {user.name}
                </h3>
                <p className="text-text7 text-theme-text-secondary text-xs">
                  {user.isOnline ? "متصل الآن" : "غير متصل"}
                </p>
              </div>

              <div
                className={`w-5 h-5 rounded-bookik-rounded-full border-2 transition-colors ${
                  selectedUsers.includes(user.id)
                    ? "bg-theme-accent-primary border-theme-accent-primary"
                    : "border-theme-text-muted"
                }`}
              >
                {selectedUsers.includes(user.id) && (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUserPlus className="text-theme-text-inverse text-xs" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-theme-border-primary">
          <button
            onClick={handleStartChat}
            disabled={selectedUsers.length === 0}
            className="w-full py-3 bg-theme-accent-primary text-theme-text-inverse rounded-lg font-medium hover:bg-theme-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            بدء المحادثة
          </button>
        </div>
      </div>
    </div>
  );
}

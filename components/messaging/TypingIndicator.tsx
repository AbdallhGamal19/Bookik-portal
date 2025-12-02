"use client";
import React from "react";

import { TypingIndicatorProps } from "@/interface";

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start">
      <div className="bg-theme-bg-hover text-theme-text-primary rounded-bookik-rounded-2xl rounded-bl-bookik-rounded-md px-4 py-2">
        <div className="flex space-x-1 space-x-reverse">
          <div className="w-2 h-2 bg-theme-text-secondary rounded-bookik-rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-theme-text-secondary rounded-bookik-rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-theme-text-secondary rounded-bookik-rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

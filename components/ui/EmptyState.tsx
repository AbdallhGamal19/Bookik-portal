"use client";
import React from "react";
import { IconType } from "react-icons";

type EmptyStateProps = {
  icon?: IconType;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}
    >
      <div className="text-center max-w-md">
        {Icon && (
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-theme-bg-card rounded-full flex items-center justify-center border border-theme-border-primary">
              <Icon className="w-10 h-10 text-theme-text-secondary" />
            </div>
          </div>
        )}

        <h3 className="text-xl font-semibold text-theme-text-primary mb-3">
          {title}
        </h3>

        <p className="text-theme-text-secondary mb-6 leading-relaxed">
          {description}
        </p>

        {actionText && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-theme-accent-primary text-theme-text-inverse rounded-lg hover:bg-theme-accent-primary/90 transition-colors font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}

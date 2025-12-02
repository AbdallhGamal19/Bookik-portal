"use client";
import React from "react";
import EmptyState from "./EmptyState";

export default function EmptyStateWrapper({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
  wrapperClassName = "",
}: any) {
  return (
    <div
      className={`bg-theme-bg-card rounded-bookik-rounded-2xl p-bookik-padding-lg border border-theme-border-primary ${wrapperClassName}`}
    >
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        actionText={actionText}
        onAction={onAction}
        className={className}
      />
    </div>
  );
}

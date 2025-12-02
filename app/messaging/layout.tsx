import React from "react";

export default function MessagingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="full-height-minus-header">
      {children}
    </div>
  );
}

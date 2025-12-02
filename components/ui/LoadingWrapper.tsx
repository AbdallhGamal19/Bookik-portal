"use client";
import React from "react";
import Loading from "./Loading";

export default function LoadingWrapper({ className = "", message }: any) {
  if (message) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}
      >
        <Loading />
        <p className="mt-4 text-theme-text-secondary">{message}</p>
      </div>
    );
  }

  return <Loading />;
}

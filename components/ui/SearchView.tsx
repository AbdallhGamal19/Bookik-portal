"use client";
import React, { useState } from "react";

import { SearchViewProps } from "@/interface";

const SearchView: React.FC<SearchViewProps> = ({
  placeholder = "Search",
  value,
  onChange,
  onSearch,
  disabled = false,
  className = "",
  leftIcon,
  rightIcon,
  iconColor,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(inputValue);
    }
  };

  const handleRightImageClick = () => {
    onSearch?.(inputValue);
  };

  return (
    <div
      className={`
      relative 
      flex 
      items-center 
      w-full 
      bg-theme-bg-input 
      border 
      border-theme-border-primary 
      rounded-bookik-rounded-2xl 
      px-2
      py-[4.5px] 
      transition-all 
      duration-200 
      focus-within:ring-2 
      focus-within:ring-theme-border-focus 
      focus-within:ring-opacity-50
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {leftIcon && <div className="text-theme-accent-primary">{leftIcon}</div>}

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className="
          flex-1 
          bg-transparent 
          border-none 
          outline-none 
          text-sm sm:text-base 
          font-inter 
          font-normal 
          leading-4 sm:leading-5 
          text-left 
          text-theme-text-primary 
          placeholder-theme-text-muted
          min-w-0
        "
        aria-label={placeholder}
      />

      {rightIcon && (
        <div className="ml-2 flex items-center text-theme-text-secondary">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default SearchView;

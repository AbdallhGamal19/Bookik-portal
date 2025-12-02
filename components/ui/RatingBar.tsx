"use client";
import React, { useState } from "react";

import { RatingBarProps } from "@/interface";

const RatingBar: React.FC<RatingBarProps> = ({
  rating = 0,
  maxRating = 5,
  onRatingChange,
  size = "md",
  readonly = false,
  className = "",
  showValue = false,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    xs: "w-2 h-2 ",
    sm: "w-3 h-3 sm:w-4 sm:h-4",
    md: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
    lg: "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8",
  };

  const handleStarClick = (starIndex: number) => {
    if (readonly) return;

    const newRating = starIndex + 1;
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  const handleStarHover = (starIndex: number) => {
    if (readonly) return;
    setHoverRating(starIndex + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const getStarColor = (starIndex: number) => {
    const effectiveRating = hoverRating || currentRating;
    return starIndex < effectiveRating
      ? "var(--theme-accent-warning)"
      : "var(--theme-border-secondary)";
  };

  return (
    <div
      className={`
      flex 
      items-center 
      gap-bookik-gap-xs sm:gap-bookik-gap-xs md:gap-bookik-gap-sm
      ${readonly ? "" : "cursor-pointer"}
      ${className}
    `
        .trim()
        .replace(/\s+/g, " ")}
    >
      <div
        className="flex items-center gap-bookik-gap-xs"
        onMouseLeave={handleMouseLeave}
        role="radiogroup"
        aria-label={`Rating: ${currentRating} out of ${maxRating} stars`}
      >
        {Array.from({ length: maxRating }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            disabled={readonly}
            className={`
              ${sizes[size]}
              transition-all 
              duration-150 
              ease-in-out
              ${
                readonly
                  ? "cursor-default"
                  : "cursor-pointer hover:scale-110 active:scale-95"
              }
              focus:outline-none 
              focus:ring-2 
              focus:ring-theme-accent-warning 
              focus:ring-opacity-50 
              rounded-bookik-rounded-sm
            `}
            aria-label={`Rate ${index + 1} star${index + 1 !== 1 ? "s" : ""}`}
            role="radio"
            aria-checked={index < currentRating}
          >
            <svg
              viewBox="0 0 24 24"
              fill={getStarColor(index)}
              stroke={getStarColor(index)}
              strokeWidth="1"
              className="w-full h-full"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>

      {showValue && (
        <span
          className="
          ml-2 
          text-sm sm:text-base 
          font-medium 
          text-gray-600
        "
        >
          {currentRating}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default RatingBar;

import React from "react";
import CategoryCard from "./CategoryCard";

import { CategoryItem, CategoryGridProps } from "@/interface";

export default function CategoryGrid({
  items,
  title,
  subtitle,
  showViewAll = false,
  viewAllLink,
}: CategoryGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-theme-text-muted text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-theme-text-secondary mb-2">
          لا توجد عروض متاحة
        </h3>
        <p className="text-theme-text-muted">
          تحقق لاحقاً للحصول على عروض جديدة
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-bookik-gap-lg">
        {items.map((item) => (
          <CategoryCard key={item.id} {...item} />
        ))}
      </div>

      {/* View All Button */}
      {showViewAll && viewAllLink && (
        <div className="text-center pt-8">
          <a
            href={viewAllLink}
            className="inline-flex items-center px-6 py-3 bg-theme-accent-primary text-theme-text-inverse rounded-lg hover:bg-theme-accent-primary/90 transition-colors font-medium"
          >
            عرض جميع العروض
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

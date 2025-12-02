"use client";
import RatingBar from "@/components/ui/RatingBar";
import { FaStar } from "react-icons/fa";

interface ProfileStatisticsProps {
  user: any;
}

export default function ProfileStatistics({ user }: ProfileStatisticsProps) {
  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-lg p-4 text-sm font-light border border-theme-border-primary shadow-theme-shadow-sm">
      <h2 className="text-theme-text-primary text-center text-lg font-semibold mb-3 flex items-center justify-center gap-2">
        <FaStar className="text-theme-accent-primary" />
        إحصائيات
      </h2>

      <div className="space-y-2">
        {/* Rating */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            التقييمات
          </span>
          <div className="flex items-center gap-1">
            {user.rating > 0 ? (
              <>
                <RatingBar rating={user.rating} readonly size="sm" />
                <span className="text-theme-text-primary font-semibold text-xs">
                  ({user.totalRatings})
                </span>
              </>
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </div>
        </div>

        {/* Client Count */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            عدد العملاء
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.clientCount > 0 ? (
              `${user.clientCount} عميل`
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            متوسط سرعة الرد
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.responseTime !== "غير محدد" ? (
              user.responseTime
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Last Seen */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            آخر تواجد
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.lastSeen !== "غير محدد" ? (
              user.lastSeen
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Completion Rate */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            معدل إتمام المشاريع
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.completionRate > 0 ? (
              <span className="bg-theme-accent-success/20 text-theme-accent-success px-2 py-1 rounded-full text-xs">
                {user.completionRate}%
              </span>
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Average Delivery */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            متوسط مدة التسليم
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.averageDelivery !== "غير محدد" ? (
              user.averageDelivery
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";
import { FaUser } from "react-icons/fa";

interface ProfileAboutProps {
  user: any;
}

export default function ProfileAbout({ user }: ProfileAboutProps) {
  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-lg p-4 text-sm font-light border border-theme-border-primary shadow-theme-shadow-sm">
      <h2 className="text-theme-text-primary text-center text-lg font-semibold mb-3 flex items-center justify-center gap-2">
        <FaUser className="text-theme-accent-primary" />
        حول
      </h2>

      <div className="space-y-2">
        {/* Skills */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            المهارات
          </span>
          <span className="text-theme-text-primary font-semibold text-left max-w-[150px] text-sm">
            {user.skills !== "غير محدد" ? (
              user.skills
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Distance */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            يبعد عنك
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.distance !== "غير محدد" ? (
              user.distance
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            المكان المقيم فيه
          </span>
          <span className="text-theme-text-primary font-semibold text-left max-w-[150px] text-sm">
            {user.location !== "غير محدد" ? (
              user.location
            ) : (
              <span className="text-theme-text-muted text-xs bg-theme-bg-tertiary px-2 py-1 rounded-full">
                غير متوفر
              </span>
            )}
          </span>
        </div>

        {/* Join Date */}
        <div className="flex items-center justify-between p-2 bg-theme-bg-secondary rounded-bookik-rounded-lg border border-theme-border-primary">
          <span className="text-theme-text-primary font-medium text-sm">
            انضم منذ
          </span>
          <span className="text-theme-text-primary font-semibold text-sm">
            {user.joinDate !== "غير محدد" ? (
              user.joinDate
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

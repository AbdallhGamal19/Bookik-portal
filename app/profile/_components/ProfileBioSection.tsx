"use client";
import { FaUser } from "react-icons/fa";

interface ProfileBioSectionProps {
  bio: string;
}

export default function ProfileBioSection({ bio }: ProfileBioSectionProps) {
  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-lg p-4 text-sm font-light border border-theme-border-primary shadow-theme-shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-theme-text-primary text-right text-lg font-semibold flex items-center gap-2">
          <FaUser className="text-theme-accent-primary" />
          نبذة مختصرة
        </h2>
      </div>

      {bio && bio.trim() !== "" ? (
        <div className="bg-theme-bg-secondary p-3 rounded-bookik-rounded-lg border border-theme-border-primary">
          <p className="text-theme-text-primary leading-relaxed text-justify text-sm">
            {bio}
          </p>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-theme-accent-primary/10 rounded-full flex items-center justify-center shadow-theme-shadow-sm">
            <FaUser className="w-8 h-8 text-theme-accent-primary" />
          </div>
          <h3 className="text-base font-semibold text-theme-text-primary mb-2">
            لا توجد نبذة مختصرة
          </h3>
          <p className="text-theme-text-secondary text-xs mb-3 max-w-md mx-auto">
            لم تقم بإضافة نبذة مختصرة بعد. أضف نبذة لتعريف الناس بنفسك!
          </p>
        </div>
      )}
    </div>
  );
}

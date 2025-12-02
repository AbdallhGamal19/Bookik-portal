"use client";
import LazyVideo from "@/components/common/LazyVideo";
import Button from "@/components/ui/Button";
import { FaPlay } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface ProfileWorkGalleryProps {
  videoData: any[];
}

export default function ProfileWorkGallery({
  videoData,
}: ProfileWorkGalleryProps) {
  return (
    <div className="bg-theme-bg-card rounded-bookik-rounded-lg p-4 text-sm font-light border border-theme-border-primary shadow-theme-shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-theme-text-primary text-right text-lg font-semibold flex items-center gap-2">
          <FaPlay className="text-theme-accent-primary" />
          أخر أعمالي
        </h2>
      </div>

      {videoData && videoData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {videoData.map((video, index) => (
            <div
              key={video.id}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-theme-shadow-md bg-theme-bg-secondary rounded-bookik-rounded-lg overflow-hidden border border-theme-border-primary"
            >
              <div className="relative w-full h-[150px] sm:h-[160px] lg:h-[180px] overflow-hidden">
                <LazyVideo
                  id={video.id}
                  likes={video.likes}
                  video_url={video.video_url}
                  showIcons={false}
                />

                {/* Video Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-theme-bg-card/95 backdrop-blur-sm rounded-bookik-rounded-lg p-2 text-center border border-theme-border-primary">
                      <p className="text-xs font-medium text-theme-text-primary">
                        عمل #{index + 1}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-theme-accent-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-theme-shadow-md">
                    <FaPlay
                      className="text-theme-text-inverse ml-1"
                      size={12}
                    />
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <div className="p-3">
                <h3 className="text-theme-text-primary font-semibold text-xs mb-1 line-clamp-2">
                  {video.title || `عمل ${index + 1}`}
                </h3>
                <div className="flex items-center justify-between text-theme-text-secondary text-xs">
                  <span>{video.views_count || 0} مشاهدة</span>
                  <span>
                    {formatDistanceToNow(
                      new Date(video.created_at || new Date()),
                      { addSuffix: true, locale: ar }
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-bookik-padding-4xl">
          <div className="w-28 h-28 mx-auto mb-bookik-margin-xl bg-gradient-to-br from-theme-accent-primary/10 to-theme-accent-secondary/10 rounded-full flex items-center justify-center shadow-theme-shadow-md">
            <FaPlay className="w-14 h-14 text-theme-accent-primary" />
          </div>
          <h3 className="text-textxl font-semibold text-theme-text-primary mb-bookik-margin-lg">
            لا توجد أعمال بعد
          </h3>
          <p className="text-theme-text-secondary mb-bookik-margin-xl max-w-md mx-auto text-textsm leading-relaxed">
            لم تقم برفع أي أعمال بعد. ابدأ بإنشاء محتوى رائع لمشاركته مع
            متابعيك!
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary hover:from-theme-accent-primary/90 hover:to-theme-accent-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-theme-shadow-lg"
          >
            🚀 إنشاء عمل جديد
          </Button>
        </div>
      )}
    </div>
  );
}

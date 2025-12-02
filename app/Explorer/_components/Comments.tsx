"use client";
import { useEffect, useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import Comment from "./Comment";
import { IComment, CommentsProps } from "@/interface";
import { addComment } from "@/server-actions";
import Swal from "sweetalert2";

const Comments = ({
  videoId,
  initialComments = [],
  isOpen = false,
  onClose,
}: CommentsProps) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Handle click outside to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const modalContent = document.querySelector("[data-modal-content]");

      // Close if clicking outside modal content
      if (modalContent && !modalContent.contains(target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      setIsAddingComment(true);
      await addComment({
        videoId,
        commentText: commentText.trim(),
        fullUrl: `${process.env.NEXT_PUBLIC_API_URL}/post/add-comment`,
      });

      // Clear comment text after successful submission
      setCommentText("");

      // Show success message
      Swal.fire({
        title: "تم إضافة التعليق بنجاح",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Refresh comments if needed
      // You might want to trigger a refresh of the comments list here
    } catch (error) {
      Swal.fire({
        title: "خطأ في إضافة التعليق",
        text: "يرجى المحاولة مرة أخرى",
        icon: "error",
      });
    } finally {
      setIsAddingComment(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center ">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        dir="rtl"
        data-modal-content
        className="relative z-10 w-full max-w-2xl max-h-[90vh] mx-4 bg-theme-bg-card rounded-bookik-rounded-2xl shadow-theme-shadow-lg flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-theme-border-primary flex-shrink-0">
          <h2 className="font-semibold text-theme-text-primary text-xl">
            التعليقات ({comments.length})
          </h2>
          <button
            onClick={onClose}
            className="text-theme-text-secondary hover:text-theme-text-primary transition-colors duration-200 p-2 hover:bg-theme-bg-secondary rounded-full"
            aria-label="إغلاق"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-2">
            {loading && (
              <div className="text-center py-8">
                <p className="text-theme-text-secondary">
                  جاري تحميل التعليقات...
                </p>
              </div>
            )}
            {error && (
              <div className="text-center py-8">
                <p className="text-theme-accent-error">{error}</p>
              </div>
            )}
            {!loading &&
              !error &&
              (comments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-theme-text-secondary">
                    لا توجد تعليقات بعد
                  </p>
                </div>
              ) : (
                comments.map(({ id, body, created_at, users }) => (
                  <Comment
                    key={id}
                    comment={body}
                    image={`${process.env.NEXT_PUBLIC_WEB_URL}/images/user/${users.image}`}
                    likes={0}
                    replies={0}
                    time={new Date(created_at).toLocaleDateString()}
                    username={users.name}
                  />
                ))
              ))}
          </div>

          {/* Comment Input Section */}
          <div className="p-4 lg:p-6 border-t border-theme-border-primary bg-theme-bg-secondary flex-shrink-0 rounded-b-bookik-rounded-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="أضف تعليقك..."
                className="flex-1 bg-theme-bg-primary text-theme-text-primary placeholder-theme-text-secondary rounded-full px-4 py-2.5 text-sm border border-theme-border-primary focus:outline-none focus:border-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary/20 transition-all duration-200"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
              />
              <button
                onClick={handleAddComment}
                disabled={isAddingComment || !commentText.trim()}
                className="bg-theme-accent-primary hover:bg-theme-accent-primary/90 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-full p-2.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-theme-shadow-sm flex-shrink-0"
              >
                {isAddingComment ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <FaPaperPlane size={14} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Comments;

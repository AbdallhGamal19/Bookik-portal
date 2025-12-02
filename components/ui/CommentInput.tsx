"use client";
import { useState } from "react";
import { FaPaperPlane, FaSmile, FaUser } from "react-icons/fa";
import { useAppContext } from "@/context/appContext";
import { addComment } from "@/server-actions";

const CommentInput: React.FC<any> = ({
  postId,
  postType = "c",
  replyId = "main",
  onCommentAdded,
  placeholder = "اكتب تعليقك هنا...",
  className = "",
}: any) => {
  const { currentUser, isAuthenticated, openLoginModal } = useAppContext();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>(null);
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("يجب تسجيل الدخول لإضافة تعليق");
      return;
    }

    if (!currentUser) {
      setError("بيانات المستخدم غير متوفرة");
      return;
    }

    if (!commentText.trim()) {
      setError("يرجى كتابة تعليق");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await addComment({
        postid: postId,
        posttype: postType,
        replayid: replyId,
        commenttext: commentText.trim(),
        files: null,
      });

      if (response.data) {
        setCommentText("");
        setError(null);
        onCommentAdded?.();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "حدث خطأ في إضافة التعليق");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEmoji = (emoji: any) => {
    setCommentText((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const emojis = [
    "😊",
    "😂",
    "❤️",
    "👍",
    "🎉",
    "🔥",
    "💯",
    "👏",
    "🙏",
    "😍",
    "🤔",
    "😎",
    "🥳",
    "✨",
    "🌟",
  ];

  // إذا لم يكن المستخدم مسجل، اعرض رسالة تسجيل الدخول
  if (!isAuthenticated) {
    return (
      <div
        className={`bg-theme-bg-card rounded-bookik-rounded-xl p-6 shadow-theme-shadow-lg border border-theme-border-primary ${className}`}
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-theme-bg-tertiary rounded-bookik-rounded-full flex items-center justify-center mx-auto">
            <FaUser className="text-theme-text-muted text-2xl" />
          </div>
          <h3 className="text-theme-text-primary font-semibold text-lg">
            تسجيل الدخول مطلوب
          </h3>
          <p className="text-theme-text-secondary text-sm">
            يجب تسجيل الدخول لإضافة تعليق على هذا المحتوى
          </p>
          <button
            onClick={() => {
              openLoginModal();
            }}
            className="bg-theme-accent-primary hover:bg-theme-accent-secondary text-theme-text-inverse px-6 py-3 rounded-bookik-rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-theme-shadow-md"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // إذا لم يكن currentUser موجود، اعرض رسالة خطأ
  if (!currentUser) {
    return (
      <div
        className={`bg-theme-bg-card rounded-bookik-rounded-xl p-6 shadow-theme-shadow-lg border border-theme-border-primary ${className}`}
      >
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-theme-bg-tertiary rounded-bookik-rounded-full flex items-center justify-center mx-auto">
            <FaUser className="text-theme-text-muted text-2xl" />
          </div>
          <h3 className="text-theme-text-primary font-semibold text-lg">
            بيانات المستخدم غير متوفرة
          </h3>
          <p className="text-theme-text-secondary text-sm">
            يرجى إعادة تسجيل الدخول
          </p>
          <button
            onClick={() => {
              openLoginModal();
            }}
            className="bg-theme-accent-primary hover:bg-theme-accent-secondary text-theme-text-inverse px-6 py-3 rounded-bookik-rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-theme-shadow-md"
          >
            إعادة تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-theme-bg-card rounded-bookik-rounded-xl p-5 shadow-theme-shadow-lg border border-theme-border-primary ${className}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
        {error && (
          <div className="bg-theme-bg-error border border-theme-border-error text-theme-text-error text-sm text-center p-3 rounded-bookik-rounded-lg">
            {error}
          </div>
        )}

        {/* Comment Input */}
        <div className="relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-theme-bg-input text-theme-text-primary placeholder-theme-text-muted rounded-bookik-rounded-xl p-4 pr-20 resize-none focus:outline-none focus:ring-2 focus:ring-theme-border-focus focus:bg-theme-bg-hover transition-all duration-300 text-sm border border-theme-border-primary"
            rows={3}
            disabled={isSubmitting}
          />

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-4 flex items-center gap-bookik-gap-md">
            <button
              type="button"
              onClick={() => setShowEmojis(!showEmojis)}
              className="text-theme-text-muted hover:text-theme-accent-warning transition-all duration-200 p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg hover:scale-110"
              title="إضافة رمز تعبيري"
            >
              <FaSmile size={18} />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !commentText.trim()}
            className="absolute bottom-4 right-4 bg-theme-accent-primary hover:bg-theme-accent-secondary disabled:bg-theme-bg-disabled disabled:cursor-not-allowed text-theme-text-inverse p-3 rounded-bookik-rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 shadow-theme-shadow-md"
            title="إرسال التعليق"
          >
            {isSubmitting ? (
              <div className="animate-spin w-5 h-5 border-2 border-theme-text-inverse border-t-transparent rounded-bookik-rounded-full" />
            ) : (
              <FaPaperPlane size={18} />
            )}
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojis && (
          <div className="bg-theme-bg-input rounded-bookik-rounded-xl p-4 border border-theme-border-primary">
            <div className="grid grid-cols-8 gap-bookik-gap-sm">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  className="text-2xl hover:scale-125 transition-transform duration-200 p-2 hover:bg-theme-bg-hover rounded-bookik-rounded-lg text-theme-text-primary"
                  title={`إضافة ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentInput;

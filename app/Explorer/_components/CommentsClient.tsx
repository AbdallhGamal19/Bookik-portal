"use client";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Comment from "./Comment";
import { IComment, CommentsClientProps } from "@/interface";

const CommentsClient = ({
  videoId,
  initialComments,
  isPopup = false,
  onClose,
  showComments = false,
}: CommentsClientProps) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const containerClasses = isPopup
    ? "absolute top-0 left-0 w-full h-full bg-theme-bg-overlay flex items-center justify-center p-4 shadow-theme-shadow-lg"
    : "absolute  top-0 right-0 p-5 w-[18rem] h-screen overflow-auto bg-theme-bg-card text-theme-text-primary hidden lg:block";

  const contentClasses = isPopup
    ? "bg-theme-bg-card rounded-bookik-rounded-2xl text-theme-text-primary w-full w-md max-h-[80vh] overflow-auto relative z-10"
    : "";

  return (
    <div
      dir="ltr"
      className={containerClasses}
      onClick={
        isPopup
          ? (e) => e.target === e.currentTarget && onClose && onClose()
          : undefined
      }
    >
      <div className={contentClasses}>
        {isPopup && (
          <span
            className="absolute top-3 right-3 text-theme-text-secondary hover:text-theme-text-primary cursor-pointer"
            onClick={onClose}
          >
            <FaTimes />
          </span>
        )}

        <div className="p-4">
          <h2 className="font-semibold text-theme-text-primary">
            Comments {comments.length}
          </h2>
          {loading && (
            <p className="text-theme-text-secondary">Loading comments...</p>
          )}
          {error && <p className="text-theme-accent-error">{error}</p>}
          {!loading &&
            !error &&
            comments.map(({ id, body, created_at, users }) => (
              <Comment
                key={id}
                comment={body}
                image={`http://dev2025.7gapp.me/images/user/${users.image}`}
                likes={0}
                replies={0}
                time={new Date(created_at).toLocaleDateString()}
                username={users.name}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsClient;

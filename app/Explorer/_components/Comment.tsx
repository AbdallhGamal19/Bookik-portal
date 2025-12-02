import Image from "next/image.js";
import Link from "next/link.js";
import { CiHeart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CommentProps } from "@/interface";

const Comment = ({
  comment,
  image,
  likes,
  replies,
  time,
  username,
}: CommentProps) => {
  return (
    <div className="Commenter py-4 text-theme-text-primary border-b border-theme-border-primary last:border-b-0 hover:bg-theme-bg-secondary/50 transition-colors duration-200 rounded-bookik-rounded-lg px-2">
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <Image
              src={image}
              width={48}
              height={48}
              alt={username}
              className="rounded-full border-2 border-theme-border-primary object-cover shadow-theme-shadow-sm"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="">
                <Link
                  className="font-semibold text-theme-text-primary hover:text-theme-accent-primary transition-colors duration-200"
                  href={"#"}
                >
                  {username}
                </Link>
              </h3>
              <span className="text-xs text-theme-text-muted">{time}</span>
            </div>
            <p className="text-theme-text-secondary mb-3 leading-relaxed">
              {comment}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-theme-text-muted hover:text-theme-accent-error transition-colors duration-200 cursor-pointer">
                <CiHeart className="text-theme-accent-error" /> {likes}
              </span>
              <span className="text-theme-accent-primary hover:text-theme-accent-secondary transition-colors duration-200 cursor-pointer">
                <Link href={"#"}>رد {replies}</Link>
              </span>
            </div>
            {replies > 0 && (
              <p className="flex items-center gap-2 text-theme-text-muted text-sm mt-2 cursor-pointer hover:text-theme-accent-primary transition-colors duration-200">
                <TfiLayoutLineSolid className="me-1" /> عرض {replies} ردود
                <IoIosArrowDown className="ms-1" />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

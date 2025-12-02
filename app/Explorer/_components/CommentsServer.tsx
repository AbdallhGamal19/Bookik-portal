import { getComments } from "@/server-actions";
import CommentsClient from "./CommentsClient";
import { CommentsServerProps } from "@/interface";

export default async function CommentsServer({ videoId }: CommentsServerProps) {
  try {
    const comments = await getComments(videoId);

    if (!comments || !Array.isArray(comments)) {
      throw new Error("Invalid comments response format");
    }

    return <CommentsClient videoId={videoId} initialComments={comments} />;
  } catch (error: any) {
    return (
      <div className="text-center text-theme-accent-error p-4">
        <p>فشل في تحميل التعليقات</p>
      </div>
    );
  }
}

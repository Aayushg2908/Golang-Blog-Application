"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Comments = ({ comments, userId }: { comments: any; userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (commentId: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `${process.env.BACKEND_URL}/api/deleteComment/${commentId}`,
        {
          data: { userId },
        }
      );
      if (response.status === 400) {
        toast.error(response.data.error);
      } else if (response.status === 200) {
        toast.success("Comment deleted successfully");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 m-4 w-full items-center">
      {comments.map((comment: any) => (
        <div
          key={comment.id}
          className="w-2/3 flex items-center justify-between gap-4 p-4 bg-gray-200 dark:bg-slate-900 rounded-lg"
        >
          <div className="opacity-70">{comment.content}</div>
          {userId === comment.authorId && (
            <Trash2
              aria-disabled={isLoading}
              onClick={() => handleDelete(comment.id)}
              className="fill-red-500 cursor-pointer"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;

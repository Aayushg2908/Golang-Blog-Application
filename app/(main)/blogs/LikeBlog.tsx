"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LikeBlog = ({ blog, userId }: { blog: any; userId: string }) => {
  const router = useRouter();
  const isLikedByUser =
    blog.likes && blog.likes.find((like: any) => like.authorId === userId);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/likeBlog/${blog.id}`,
        { userId }
      );
      if (response.status === 400) {
        toast.error(response.data.error);
      } else if (response.status === 200) {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <span className="flex items-center">
      <HeartIcon
        className={cn("cursor-pointer", isLikedByUser && "fill-red-500")}
        onClick={handleLike}
      />
      {blog.likes ? blog.likes.length : 0}
    </span>
  );
};

export default LikeBlog;

"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteBlog = ({ blogId, userId }: { blogId: string; userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:8080/api/deleteBlog/${blogId}`,
        {
          data: { userId: userId },
        }
      );
      if (response.status === 400) {
        toast.error(response.data.error);
      } else if (response.status === 200) {
        toast.success("Blog deleted successfully");
        router.push("/blogs");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} variant="premium2" onClick={handleClick}>
      Delete{" "}
      <span className="ml-1">
        <Trash2 />
      </span>
    </Button>
  );
};

export default DeleteBlog;

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { Edit } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteBlog from "./DeleteBlog";
import { Separator } from "@/components/ui/separator";
import CommentsForm from "./CommentForm";
import Comments from "./Comments";

const BlogPage = async ({ params }: { params: { blogId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const { blogId } = params;
  const response = await axios.get(
    `${process.env.BACKEND_URL}/api/getBlog/${blogId}`
  );
  const blog = await response.data.data;

  return (
    <div className="mt-10 h-full w-full flex flex-col gap-2 items-center justify-center">
      {blog.authorId === userId && (
        <div className="flex justify-between gap-4 mb-4 items-center">
          <Link
            className={cn(
              buttonVariants({
                variant: "premium2",
              })
            )}
            href={`/blogs/${blogId}/edit`}
          >
            Edit{" "}
            <span className="ml-1">
              <Edit />
            </span>
          </Link>
          <DeleteBlog blogId={blogId} userId={userId} />
        </div>
      )}
      <div className="font-bold text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 mb-4">
        {blog.title}
      </div>
      <div className="text-xl font-bold mt-4">{blog.content}</div>
      <Separator className="mt-4 w-2/3" />
      <CommentsForm blogId={blogId} userId={userId} />
      <Comments comments={blog.comments} userId={userId} />
    </div>
  );
};

export default BlogPage;

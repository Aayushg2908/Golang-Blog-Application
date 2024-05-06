import axios from "axios";
import { CloudIcon } from "lucide-react";
import Link from "next/link";
import LikeBlog from "./LikeBlog";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const BlogsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const response = await axios.get(
    `${process.env.BACKEND_URL}/api/getAllBlogs`
  );
  const blogs = await response.data.data;

  return (
    <div className="mx-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-10 mt-4">
      {blogs.map((blog: any) => (
        <div
          key={blog.id}
          className="h-[70px] border border-slate-300 rounded-lg flex flex-col items-center justify-between py-1"
        >
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          <div className="w-full flex items-center justify-between px-4">
            <LikeBlog blog={blog} userId={userId} />
            <span className="flex items-center">
              <CloudIcon /> {blog.comments ? blog.comments.length : 0}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsPage;

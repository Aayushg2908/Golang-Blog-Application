import axios from "axios";
import EditBlogForm from "./EditBlogForm";

const EditBlogPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;
  const response = await axios.get(
    `${process.env.BACKEND_URL}/api/getBlog/${blogId}`
  );
  const blog = await response.data.data;

  return <EditBlogForm blog={blog} />;
};

export default EditBlogPage;

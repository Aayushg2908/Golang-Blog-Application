"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  content: z.string().min(4),
});

const CommentsForm = ({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.BACKEND_URL}/api/createComment/${blogId}`,
        {
          authorId: userId,
          content: values.content,
        }
      );
      if (response.status === 400) {
        toast.error(response.data.error);
      } else if (response.status === 200) {
        toast.success("Comment Added Successfully");
        form.reset();
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 font-bold mt-4">
        Comments
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="ml-2"
            disabled={isLoading}
            variant="premium2"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CommentsForm;

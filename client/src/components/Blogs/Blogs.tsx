import React from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  AppLoader,
  OverflowLock,
  Box,
  Heading,
  Overflow,
  List,
  Banner,
} from "../common";
import { useBlogsQuery } from "./hooks";
import BlogItem from "./BlogItem";
import AddBlogForm from "./AddBlogForm";
import {
  useAddBlogMutation,
  useDeleteBlogMutation,
} from "./hooks/useBlogsMutations";
import { IBlog, IPostBlogPayload } from "./Blog.types";

const Blogs = () => {
  const {
    blogs = [],
    isLoading: isGetLoading,
    error,
    isError,
  } = useBlogsQuery();
  const { mutateAsync: postBlog, isLoading: isPostLoading } =
    useAddBlogMutation();
  const { mutateAsync: deleteBlog, isLoading: isDeleteLoading } =
    useDeleteBlogMutation();
  const isLoading = isGetLoading || isPostLoading || isDeleteLoading;

  const handleSubmit = async ({ title, author, url }: IPostBlogPayload) => {
    console.log("final submit", {
      title,
      author,
      url,
    });

    // ** Exact check
    const hasExactDup = blogs?.some(
      (b) => b.title === title && b.author === author && b.url === url
    );

    if (hasExactDup) {
      return toast.error(`${title} already exists`);
    }

    return await postBlog({ title, author, url });
  };

  const handleDeleteBlog = async (blog: IBlog) => {
    console.log("id - confirm mongo whats", blog);
    return await deleteBlog(blog);
  };

  return (
    <AppLoader isLoading={isLoading}>
      <OverflowLock>
        <Box p={2}>
          <Heading as="h2">Blogs</Heading>
        </Box>
        <Box p={2}>
          <AddBlogForm
            blogs={blogs}
            onSubmit={handleSubmit}
            disabled={isLoading}
          />
        </Box>

        <Overflow>
          <Box p={2}>
            {blogs && blogs.length > 0 && (
              <List>
                {blogs.map((blog) => (
                  <BlogItem
                    key={blog.id}
                    blog={blog}
                    onDelete={handleDeleteBlog}
                  />
                ))}
              </List>
            )}

            {error && isError && (
              <Banner variant="danger">{error.message}</Banner>
            )}
          </Box>
        </Overflow>
        <Toaster />
      </OverflowLock>
    </AppLoader>
  );
};

export default Blogs;

import React from "react";
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

const Blogs = () => {
  const { blogs, isLoading, error, isError } = useBlogsQuery();
  console.log("blogs", blogs);

  return (
    <AppLoader isLoading={isLoading}>
      <OverflowLock>
        <Box p={2}>
          <Heading as="h2">Blogs</Heading>
        </Box>
        <Box p={2}>
          <AddBlogForm />
        </Box>

        <Overflow>
          <Box p={2}>
            {blogs && blogs.length > 0 && (
              <List>
                {blogs.map((blog) => (
                  <BlogItem key={blog.id} blog={blog} />
                ))}
              </List>
            )}

            {error && isError && (
              <Banner variant="danger">{error.message}</Banner>
            )}
          </Box>
        </Overflow>
      </OverflowLock>
    </AppLoader>
  );
};

export default Blogs;

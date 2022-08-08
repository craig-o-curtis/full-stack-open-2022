import React from "react";
import { Box, ListItem } from "../common";

import { IBlog } from "./Blog.types";

interface BlogItemProps {
  blog: IBlog;
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <ListItem p={1} mb={1} key={blog.id}>
      <Box>
        <strong>Title: </strong>
        {blog.title}
      </Box>
      <Box>
        <strong>Author: </strong>
        {blog.author}
      </Box>
      <Box>
        <strong>Likes: </strong>
        {blog.likes}
      </Box>
      <Box>
        <strong>Link: </strong>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
      </Box>
    </ListItem>
  );
};

export default BlogItem;

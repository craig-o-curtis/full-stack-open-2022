import React from "react";
import { IBlog } from "./Blog.types";
import * as Styled from "./BlogItem.styled";

interface BlogItemProps {
  blog: IBlog;
  currentUserId?: string;
  onDelete: (blog: IBlog) => void;
}

const BlogItem = ({ blog, onDelete, currentUserId }: BlogItemProps) => {
  console.log("blog", blog);
  console.log("userid", currentUserId);

  const handleOnDelete = () => {
    onDelete?.(blog);
  };

  return (
    <Styled.BlogItem p={1} mb={1} key={blog.id}>
      <Styled.BlogItemBox>
        <Styled.BlogData>
          <Styled.BlogDatum>
            <strong>Title: </strong>
            {blog.title}
          </Styled.BlogDatum>
          <Styled.BlogDatum>
            <strong>Author: </strong>
            {blog.author}
          </Styled.BlogDatum>
          <Styled.BlogDatum>
            <strong>Likes: </strong>
            {blog.likes}
          </Styled.BlogDatum>
          <Styled.BlogDatum>
            <strong>Link: </strong>
            <a
              href={blog.url}
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              {blog.url}
            </a>
          </Styled.BlogDatum>
        </Styled.BlogData>
      </Styled.BlogItemBox>
      <Styled.BlogItemBox>
        {blog.user === currentUserId && (
          <Styled.DeleteButton onClick={handleOnDelete}>
            Delete
          </Styled.DeleteButton>
        )}
      </Styled.BlogItemBox>
    </Styled.BlogItem>
  );
};

export default BlogItem;

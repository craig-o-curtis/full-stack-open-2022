import React, { useState } from 'react';
import { IBlog } from './Blog.types';
import * as Styled from './BlogItem.styled';
import { Button, Box } from '../common';
export interface BlogItemProps {
  blog: IBlog;
  currentUserId?: string;
  onDelete: (blog: IBlog) => void;
  onLike: (blog: IBlog) => void;
}

const BlogItem = ({ blog, onDelete, onLike, currentUserId }: BlogItemProps) => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  const handleOnDelete = () => {
    onDelete(blog);
  };

  const showLikeButton = currentUserId !== blog.user;

  const handleOnLike = () => {
    onLike(blog);
  };

  return (
    <Styled.BlogItem p={1} mb={1} key={blog.id} className="blog-item">
      <Styled.BlogItemBox>
        <Styled.BlogData>
          <Styled.BlogDatum>
            <strong>Title: </strong>
            {blog.title}
          </Styled.BlogDatum>
          {isShowDetails && (
            <>
              <Styled.BlogDatum>
                <strong>Author: </strong>
                {blog.author}
              </Styled.BlogDatum>
              <Styled.BlogDatum>
                <Box flex>
                  <strong>Likes: </strong>
                  <span>{blog.likes}</span>
                  {showLikeButton && (
                    <Styled.LikeButton onClick={handleOnLike}>
                      Like
                    </Styled.LikeButton>
                  )}
                </Box>
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
            </>
          )}
        </Styled.BlogData>
      </Styled.BlogItemBox>
      <Styled.BlogItemBox flex>
        <Styled.ButtonContainer ml={1}>
          <Button onClick={() => setIsShowDetails((prev) => !prev)}>
            {isShowDetails ? 'Hide' : 'Show'} details
          </Button>
        </Styled.ButtonContainer>
        {blog.user === currentUserId && (
          <Styled.ButtonContainer ml={1}>
            <Styled.DeleteButton onClick={handleOnDelete}>
              Delete
            </Styled.DeleteButton>
          </Styled.ButtonContainer>
        )}
      </Styled.BlogItemBox>
    </Styled.BlogItem>
  );
};

export default BlogItem;

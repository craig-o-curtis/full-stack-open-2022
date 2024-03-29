// cSpell:ignore Toggleable
import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { useUserContext } from 'auth/AuthProvider';

import {
  AppLoader,
  Banner,
  Box,
  Heading,
  List,
  NavButton,
  Overflow,
  OverflowLock,
  SortByButton,
  Toggleable,
} from 'components/common';

import AddBlogForm from './AddBlogForm';
import { IBlog, IPostBlogPayload } from './Blog.types';
import BlogItem from './BlogItem';
import { useBlogsQuery } from './hooks';
import {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from './hooks/useBlogsMutations';

type SortGuy = 'ASC' | 'DESC';

const Blogs = () => {
  const [sortGuys, setSortGuys] = useState<SortGuy>('DESC');
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
  const { mutateAsync: updateBlog, isLoading: isUpdateLoading } =
    useUpdateBlogMutation();

  const isLoading =
    isGetLoading || isPostLoading || isDeleteLoading || isUpdateLoading;
  const [{ user }] = useUserContext();

  // ** API Methods
  const handleSubmit = async ({ title, author, url }: IPostBlogPayload) => {
    // ** Exact check
    const hasExactDup = blogs?.some(
      (b) => b.title === title && b.author === author && b.url === url
    );

    if (hasExactDup) {
      return toast.error(`${title} already exists`);
    }

    toggleAddBlog(false);
    return await postBlog({ title, author, url });
  };

  // confirm 5.10 already implemented
  const handleDeleteBlog = async (blog: IBlog) => {
    return await deleteBlog(blog);
  };

  const toggleAddBlog = (show: boolean | undefined) => {
    toggleBlogRef.current?.handleToggle(show);
  };

  const handleLikeBlog = async (blog: IBlog) => {
    const payload = {
      ...blog,
      likes: blog.likes + 1,
    };
    return await updateBlog(payload);
  };
  // ** API Methods ^^^^^^

  // ** UI Methods
  const toggleBlogRef = useRef(null) as any;

  const handleSortBy = () => {
    setSortGuys((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  const sortedBlogs =
    !blogs || blogs.length === 0
      ? []
      : sortBy(blogs, (b) => (sortGuys === 'ASC' ? b.likes : -b.likes));
  // ** UI Methods ^^^^^^

  return (
    <AppLoader isLoading={isLoading}>
      <OverflowLock>
        <Box p={2} flex justifyContent="space-between">
          <Heading as="h1">Blogs</Heading>
          <SortByButton
            sortBy={sortGuys}
            onClickSortBy={handleSortBy}
            disabled={isEmpty(sortedBlogs)}
          />
          <NavButton />
        </Box>

        <Box p={2}>
          <Toggleable
            ref={toggleBlogRef}
            isShowing={false}
            showText="Add blog"
            hideText="Hide add blog form"
          >
            {/* // ** 5.6 confirm already separated Blog form */}
            <AddBlogForm
              blogs={blogs}
              onSubmit={handleSubmit}
              disabled={isLoading}
            />
          </Toggleable>
        </Box>

        <Overflow>
          <Box p={2}>
            {sortedBlogs && (
              <List>
                {sortedBlogs.map((blog) => (
                  <BlogItem
                    key={blog.id}
                    blog={blog}
                    onDelete={handleDeleteBlog}
                    onLike={handleLikeBlog}
                    currentUserId={user?.id}
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

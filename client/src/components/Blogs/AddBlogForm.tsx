import React from 'react';
import { Box, Form, FormControl, FormSubmitButton } from 'components/common';
import { IBlog, IPostBlogPayload } from './Blog.types';

export interface AddBlogFormProps {
  blogs: IBlog[];
  disabled?: boolean;
  onSubmit: (newBlog: IPostBlogPayload) => void;
}

// ** Confirm FE component to add blog 5.a 5.3
const AddBlogForm = ({ disabled, onSubmit }: AddBlogFormProps) => {
  const handleSubmit = (data: IPostBlogPayload) => {
    onSubmit?.(data);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} debug resetOnSuccess>
        <FormControl
          name="title"
          label="Title:"
          type="text"
          required
          minLength={3}
          placeholder="Enter title..."
        />

        <FormControl
          name="author"
          label="Author:"
          type="text"
          required
          minLength={3}
          placeholder="Enter author..."
        />

        <FormControl
          name="url"
          label="Url:"
          type="url"
          required
          minLength={3}
          placeholder="Enter url..."
        />

        <Box flex flexDirection="row-reverse">
          <FormSubmitButton disabled={disabled}>Submit</FormSubmitButton>
        </Box>
      </Form>
    </div>
  );
};

export default AddBlogForm;

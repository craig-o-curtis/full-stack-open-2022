import React from "react";
import { Box, Form, FormControl, FormSubmitButton } from "../common";

const AddBlogForm = () => {
  const handleSubmit = async (data: any) => {
    try {
    } catch (error) {}
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} debug>
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
          <FormSubmitButton>Submit</FormSubmitButton>
        </Box>
      </Form>
    </div>
  );
};

export default AddBlogForm;

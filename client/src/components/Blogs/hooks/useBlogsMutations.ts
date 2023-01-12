// ** Simple implementation of React Query for easy server client state management
import toast from 'react-hot-toast';
import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from 'react-query';

import { apiBaseUrl } from 'api';
import { AuthTokenConfig, useAuthTokenConfig } from 'auth';
import axios from 'axios';

import {
  IBlog,
  IPostBlogPayload,
  IUpdateBlogPayload,
} from 'components/Blogs/Blog.types';

import { queryKey } from './useBlogsQuery';

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

// TODO need to add token to unit tests, follow blogs as example
const postBlog =
  (config: AuthTokenConfig) => async (payload: IPostBlogPayload) => {
    const response = await axios.post(`${apiBaseUrl}/blogs`, payload, config);
    return response;
  };

const updateBlog =
  (config: AuthTokenConfig) =>
  async ({ id: blogId, ...payload }: IBlog) => {
    const updateBlogPayload: IUpdateBlogPayload = { ...payload };

    const response = await axios.put(
      `${apiBaseUrl}/blogs/${blogId}`,
      updateBlogPayload,
      config
    );
    return response;
  };

const deleteBlog = (config: AuthTokenConfig) => async (blog: IBlog) => {
  const response = await axios.delete(`${apiBaseUrl}/blogs/${blog.id}`, config);
  return response;
};

function useBlogsMutation<T>(
  mutationFn: (config: AuthTokenConfig) => MutationFunction<any, T>,
  {
    onSuccess,
    onError,
    ...options
  }: UseMutationOptions<unknown, unknown, T> = {}
) {
  const queryClient = useQueryClient();
  const config = useAuthTokenConfig();

  return useMutation(mutationFn(config), {
    ...options,
    onSuccess: async (...args) => {
      void queryClient.invalidateQueries(queryKey);
      if (onSuccess) {
        await onSuccess(...args);
      }
    },
    onError: async (...args) => {
      if (onError) {
        await onError(...args);
      }
    },
  });
}

export function useAddBlogMutation() {
  return useBlogsMutation(postBlog, {
    onSuccess: (_, blog) => {
      toast.success(`Added blog: ${blog.title}`);
    },
    onError: (error: any, blog) => {
      errorHandler(error, `Problem adding blog: ${blog.title}`);
    },
  });
}

export function useUpdateBlogMutation() {
  return useBlogsMutation(updateBlog, {
    onSuccess: (_, blog) => {
      toast.success(`Updated blog: ${blog.title}`);
    },
    onError: (error, blog) => {
      errorHandler(error, `Problem updating blog: ${blog.title}`);
    },
  });
}

export function useDeleteBlogMutation() {
  return useBlogsMutation(deleteBlog, {
    onSuccess: (_, blog) => {
      toast.success(`Deleted blog: ${blog.title}`);
    },
    onError: (error, blog) => {
      errorHandler(error, `Problem deleting blog: ${blog.title}`);
    },
  });
}

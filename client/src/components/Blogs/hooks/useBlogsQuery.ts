// ** Simple implementation of React Query for easy server client state management
import { useQuery } from 'react-query';
import axios from 'axios';
import { IBlog } from 'components/Blogs/Blog.types';
import { apiBaseUrl } from 'api';

export const queryKey = 'Blogs';

const getBlogs = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/blogs`);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useBlogsQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    IBlog[],
    Error
  >(queryKey, getBlogs);
  return { blogs: data, isLoading: isLoading || isFetching, isError, error };
};

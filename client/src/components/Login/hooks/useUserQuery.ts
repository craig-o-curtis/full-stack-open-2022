// ** Simple implementation of React Query for easy server client state management
import { useQuery } from "react-query";
import axios from "axios";

import { apiBaseUrl } from "../../../api";

export const queryKey = "currentUser";

const getCurrentUser = async (userId: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users/${userId}`);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useUserQuery = (userId: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<any, Error>(
    queryKey,
    () => getCurrentUser(userId)
  );
  return { data, isLoading: isLoading || isFetching, isError, error };
};

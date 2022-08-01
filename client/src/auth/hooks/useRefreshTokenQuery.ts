// ** Simple implementation of React Query for easy server client state management
import { useQuery } from "react-query";
import axios from "axios";

import { apiBaseUrl } from "../../api";

export const queryKey = "currentUserToken";

const getRefreshToken = async (token: string | undefined) => {
  if (!token) return;
  try {
    const response = await axios.get(`${apiBaseUrl}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useRefreshTokenQuery = (token: string | undefined) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<any, Error>(
    queryKey,
    () => getRefreshToken(token)
  );

  return { data, isLoading: isLoading || isFetching, isError, error };
};

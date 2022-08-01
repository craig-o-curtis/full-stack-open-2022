// ** Simple implementation of React Query for easy server client state management
import { useQuery } from "react-query";
import axios from "axios";
import { useAuthTokenConfig, AuthTokenConfig } from "./useAuthTokenConfig";
import { apiBaseUrl } from "../../api";

export const queryKey = "currentUserToken";

const getRefreshToken = async (config: AuthTokenConfig) => {
  if (!config) return;

  try {
    const response = await axios.get(`${apiBaseUrl}/login`, config);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useRefreshTokenQuery = () => {
  const config = useAuthTokenConfig();

  const { data, isLoading, isFetching, isError, error } = useQuery<any, Error>(
    queryKey,
    () => getRefreshToken(config)
  );

  return { data, isLoading: isLoading || isFetching, isError, error };
};

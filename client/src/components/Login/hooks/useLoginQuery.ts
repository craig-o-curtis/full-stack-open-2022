// ** Simple implementation of React Query for easy server client state management
import { useQuery } from "react-query";
import axios from "axios";

import { apiBaseUrl } from "../../../api";

export const queryKey = "Login";

const getUserLogin = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useLoginQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery<any, Error>(
    queryKey,
    getUserLogin
  );
  return { contacts: data, isLoading: isLoading || isFetching, isError, error };
};

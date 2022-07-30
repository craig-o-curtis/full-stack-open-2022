// ** Simple implementation of React Query for easy server client state management
import { useQuery } from "react-query";
import axios from "axios";
import { apiBaseUrl } from "../../api";
import { IAuthenticatedUser } from "../Auth.types";

export const queryKey = "AuthenticatedUser";

const getLogin = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/login`);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useLoginQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    IAuthenticatedUser,
    Error
  >([queryKey], getLogin);
  return { user: data, isLoading: isLoading || isFetching, isError, error };
};

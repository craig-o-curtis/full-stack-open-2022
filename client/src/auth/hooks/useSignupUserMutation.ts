// ** Simple implementation of React Query for easy server client state management
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";
import axios from "axios";
import { apiBaseUrl } from "../../api";
import { queryKey } from "./useRefreshTokenQuery";

import { ISignupUser } from "../Auth.types";

import toast from "react-hot-toast";

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

const postSignupUser = async (payload: ISignupUser) => {
  const response = await axios.post(`${apiBaseUrl}/users`, payload);
  // ** return user for UserContext
  return response.data;
};

function useUserMutation<T>(
  mutationFn: MutationFunction<any, T>,
  {
    onSuccess,
    onError,
    ...options
  }: UseMutationOptions<unknown, unknown, T> = {}
) {
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
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

export function useSignupUserMutation() {
  return useUserMutation(postSignupUser, {
    onSuccess: (_, user) => {
      toast.success(`Created user: ${user.username}`);
    },
    onError: (error: any, user) => {
      errorHandler(error, `Problem creating user: ${user.username}`);
    },
  });
}

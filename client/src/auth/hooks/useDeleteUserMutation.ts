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

import toast from "react-hot-toast";

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

const deleteUser = async ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  const response = await axios.delete(`${apiBaseUrl}/users/${id}`);
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
      void queryClient.removeQueries(queryKey);
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

export function useDeleteUserMutation() {
  return useUserMutation(deleteUser, {
    onSuccess: (_, { username }) => {
      toast.success(`Deleted user: ${username}`);
    },
    onError: (error: any, { username }) => {
      errorHandler(error, `Problem deleting user: ${username}`);
    },
  });
}

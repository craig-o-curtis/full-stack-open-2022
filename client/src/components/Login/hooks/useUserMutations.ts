// ** Simple implementation of React Query for easy server client state management
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";
import { apiBaseUrl } from "../../../api";

import { queryKey } from "./useUserQuery";
import axios from "axios";
import { ILoginUser, IUser } from "../Login.types";

import toast from "react-hot-toast";

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

const postLoginUser = async (payload: ILoginUser) => {
  const response = await axios.post(`${apiBaseUrl}/login`, payload);
  // ** return user for UserContext
  return response.data;
};

const updateUser = async (payload: IUser) => {
  const response = await axios.put(
    `${apiBaseUrl}/contacts/${payload.id}`,
    payload
  );
  return response;
};

const deleteUser = async (contact: IUser) => {
  const response = await axios.delete(`${apiBaseUrl}/users/${contact.id}`);
  return response;
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

export function useLoginUserMutation() {
  return useUserMutation(postLoginUser, {
    onSuccess: (_, user) => {
      toast.success(`Added user: ${user.username}`);
    },
    onError: (error: any, user) => {
      errorHandler(error, `Problem adding user: ${user.username}`);
    },
  });
}

// ** not used yet
export function useUpdateUserMutation() {
  return useUserMutation(updateUser, {
    onSuccess: (_, user) => {
      toast.success(`Updated user: ${user.name}`);
    },
    onError: (error, user) => {
      errorHandler(error, `Problem updating contact: ${user.name}`);
    },
  });
}

// ** not used yet
export function useDeleteUserMutation() {
  return useUserMutation(deleteUser, {
    onSuccess: (_, user) => {
      toast.success(`Deleted user: ${user.name}`);
    },
    onError: (error, user) => {
      errorHandler(error, `Problem deleting user: ${user.name}`);
    },
  });
}

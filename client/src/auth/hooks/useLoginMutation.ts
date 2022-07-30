// ** Simple implementation of React Query for easy server client state management
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";
import { apiBaseUrl } from "../../api";

import { queryKey } from "./useLoginQuery";
import axios from "axios";
import { IAuthenticatedUser } from "../Auth.types";
import toast from "react-hot-toast";

type PartialPayload = Omit<IAuthenticatedUser, "id">;

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

const postLogin = async (payload: PartialPayload) => {
  const response = await axios.post(`${apiBaseUrl}/contacts`, payload);
  return response;
};

function useLoginMutation<T>(
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

export function usePostLoginMutation() {
  return useLoginMutation(postLogin, {
    onSuccess: (_, contact) => {
      toast.success(`Added contact: ${contact.name}`);
    },
    onError: (error: any, contact) => {
      errorHandler(error, `Problem adding contact: ${contact.name}`);
    },
  });
}

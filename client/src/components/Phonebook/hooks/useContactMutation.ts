// ** Simple implementation of React Query for easy server client state management
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";
import { apiBaseUrl } from "../../../api";
import { useAuthTokenConfig, AuthTokenConfig } from "../../../auth";
import { queryKey } from "./useContactsQuery";
import axios from "axios";
import { IContact } from "../Contact.types";
import toast from "react-hot-toast";

type PartialPayload = Omit<IContact, "id">;

function errorHandler(error: any, defaultMessage: string) {
  if (error?.response?.data?.error) {
    toast.error(error?.response?.data?.error);
  } else {
    toast.error(defaultMessage);
  }
}

// TODO need to add token to unit tests, follow blogs as example
const postContact =
  (config: AuthTokenConfig) => async (payload: PartialPayload) => {
    const response = await axios.post(
      `${apiBaseUrl}/contacts`,
      payload,
      config
    );
    return response;
  };

const updateContact =
  (config: AuthTokenConfig) => async (payload: IContact) => {
    const response = await axios.put(
      `${apiBaseUrl}/contacts/${payload.id}`,
      payload,
      config
    );
    return response;
  };

const deleteContact =
  (config: AuthTokenConfig) => async (contact: IContact) => {
    const response = await axios.delete(
      `${apiBaseUrl}/contacts/${contact.id}`,
      config
    );
    return response;
  };

function useContactsMutation<T>(
  mutationFn: (config: AuthTokenConfig) => MutationFunction<any, T>,
  {
    onSuccess,
    onError,
    ...options
  }: UseMutationOptions<unknown, unknown, T> = {}
) {
  const queryClient = useQueryClient();
  const config = useAuthTokenConfig();

  return useMutation(mutationFn(config), {
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

export function useAddContactMutation() {
  return useContactsMutation(postContact, {
    onSuccess: (_, contact) => {
      toast.success(`Added contact: ${contact.name}`);
    },
    onError: (error: any, contact) => {
      errorHandler(error, `Problem adding contact: ${contact.name}`);
    },
  });
}

export function useUpdateContactMutation() {
  return useContactsMutation(updateContact, {
    onSuccess: (_, contact) => {
      toast.success(`Updated contact: ${contact.name}`);
    },
    onError: (error, contact) => {
      errorHandler(error, `Problem updating contact: ${contact.name}`);
    },
  });
}

export function useDeleteContactMutation() {
  return useContactsMutation(deleteContact, {
    onSuccess: (_, contact) => {
      toast.success(`Deleted contact: ${contact.name}`);
    },
    onError: (error, contact) => {
      errorHandler(error, `Problem deleting contact: ${contact.name}`);
    },
  });
}

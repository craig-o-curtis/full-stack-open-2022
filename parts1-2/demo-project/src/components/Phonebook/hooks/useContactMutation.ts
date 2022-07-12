// ** Simple implementation of React Query for easy server client state management
import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "react-query";

import { queryKey } from "./useContactsQuery";
import axios from "axios";
import { IContact } from "../Contact.types";
import toast from "react-hot-toast";

type PartialPayload = Omit<IContact, "id">;

const postContact = async (payload: PartialPayload) => {
  const response = await axios.post(
    "http://localhost:3001/api/contacts",
    payload
  );
  return response;
};

const updateContact = async (payload: IContact) => {
  const response = await axios.patch(
    `http://localhost:3001/api/contacts/${payload.id}`,
    payload
  );
  return response;
};

const deleteContact = async (contact: IContact) => {
  const response = await axios.delete(
    `http://localhost:3001/api/contacts/${contact.id}`
  );
  return response;
};

function useContactsMutation<T>(
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

export function useAddContactMutation() {
  return useContactsMutation(postContact, {
    onSuccess: (_, contact) => {
      toast.success(`Added contact: ${contact.name}`);
    },
    onError: (_, contact) => {
      toast.error(`Problem adding contact: ${contact.name}`);
    },
  });
}

export function useUpdateContactMutation() {
  return useContactsMutation(updateContact, {
    onSuccess: (_, contact) => {
      toast.success(`Updated contact: ${contact.name}`);
    },
    onError: (_, contact) => {
      toast.error(`Problem adding contact: ${contact.name}`);
    },
  });
}

export function useDeleteContactMutation() {
  return useContactsMutation(deleteContact, {
    onSuccess: (_, contact) => {
      toast.success(`Deleted contact: ${contact.name}`);
    },
    onError: (_, contact) => {
      toast.error(`Problem deleting contact: ${contact.name}`);
    },
  });
}

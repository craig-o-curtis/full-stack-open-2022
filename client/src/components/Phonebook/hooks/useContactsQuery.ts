// ** Simple implementation of React Query for easy server client state management
import { useQuery } from 'react-query';

import { apiBaseUrl } from 'api';
import axios from 'axios';

import { IContact } from '../Contact.types';

export const queryKey = 'Contacts';

const getContacts = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/contacts`);
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useContactsQuery = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    IContact[],
    Error
  >(queryKey, getContacts);
  return { contacts: data, isLoading: isLoading || isFetching, isError, error };
};

import { useQuery } from "react-query";
import axios from "axios";
import { IContact } from "../Contact.types";

export const queryKey = "Contacts";

const getContacts = async () => {
  try {
    const response = await axios.get("http://localhost:3001/contacts");
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useContactsQuery = () => {
  const { data, isLoading, isError, error } = useQuery<IContact[], Error>(
    queryKey,
    getContacts
  );
  return { contacts: data, isLoading, isError, error };
};

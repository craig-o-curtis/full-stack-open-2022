import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Banner,
  Heading,
  Loader,
  Box,
  Overflow,
  OverflowLock,
} from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";
import FilterContacts from "./FilterContacts";
import {
  useContactsQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./hooks";

// ** Completed extraction already for part-2.b Exercise 2.10
const Phonebook = () => {
  const { contacts, isLoading, error, isError } = useContactsQuery();
  const [filter, setFilter] = useState<string>("");
  const { mutateAsync: postContact } = useAddContactMutation();
  const { mutateAsync: updateContact } = useUpdateContactMutation();
  const { mutateAsync: deleteContact } = useDeleteContactMutation();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    { name, number }: { name: string; number: string }
  ) => {
    event.preventDefault();

    const hasExactDup = contacts?.some(
      (c) => c.name === name && c.number === number
    );
    const sameContact = contacts?.find((c) => c.name === name);

    if (hasExactDup) {
      return toast.error(`${name} already exists`);
    }

    if (sameContact !== undefined) {
      // eslint-disable-next-line no-restricted-globals
      confirm(
        `${name} already exists but with a different number. Are you sure you want to overwrite this contact with a new number?`
      ) && updateContact({ name, number, id: sameContact.id });
      return;
    }

    return await postContact({ name, number });
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(() => newFilter);
  };

  const handleDelete = async (contact: IContact) => {
    // eslint-disable-next-line no-restricted-globals
    const okToDelete = confirm(
      `Are you sure you want to delete ${contact.name}?`
    );
    if (!okToDelete) {
      return;
    }
    await deleteContact(contact);
  };

  return (
    <OverflowLock>
      <Box p={2}>
        <Heading as="h2">Phonebook</Heading>

        <Box flex justifyContent="space-between">
          {contacts && (
            <AddContactForm onSubmit={handleSubmit} contacts={contacts} />
          )}
          {contacts && contacts.length > 0 && (
            <Box alignSelf="flex-end" mt="auto">
              <FilterContacts
                filter={filter}
                onChange={handleFilterChange}
                onClear={() => setFilter("")}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Overflow>
        {contacts && (
          <Box p={2}>
            <Heading as="h2">Contacts:</Heading>

            <Contacts
              contacts={contacts}
              filter={filter}
              onDeleteContact={handleDelete}
            />
          </Box>
        )}
        {isLoading && <Loader />}
        {isError && error && <Banner variant="danger">{error.message}</Banner>}
      </Overflow>
      <Toaster />
    </OverflowLock>
  );
};

export default Phonebook;

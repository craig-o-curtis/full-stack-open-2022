import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Banner, Heading, Loader } from "../common";
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

    const hasDupe = contacts?.some(
      (c) => c.name === name && c.number === number
    );
    if (hasDupe) {
      return toast.error(`${name} already exists`);
    }

    const sameContact = contacts?.find((c) => c.name === name);

    if (sameContact === undefined) {
      return await postContact({ name, number });
    }

    // eslint-disable-next-line no-restricted-globals
    const okToUpdate = confirm(
      `${name} already exists but with a different number. Are you sure you want to overwrite this contact with a new number?`
    );
    if (!okToUpdate) {
      return;
    }
    return await updateContact({ name, number, id: sameContact.id });
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
    <div>
      <Heading as="h2">Phonebook</Heading>
      {contacts && (
        <>
          <AddContactForm onSubmit={handleSubmit} contacts={contacts} />
          <Heading as="h2">Contacts:</Heading>
          {contacts.length > 0 && (
            <FilterContacts
              filter={filter}
              onChange={handleFilterChange}
              onClear={() => setFilter("")}
            />
          )}
          <Contacts
            contacts={contacts}
            filter={filter}
            onDeleteContact={handleDelete}
          />
        </>
      )}
      {isLoading && <Loader />}
      {isError && error && <Banner variant="danger">{error.message}</Banner>}
      <Toaster />
    </div>
  );
};

export default Phonebook;

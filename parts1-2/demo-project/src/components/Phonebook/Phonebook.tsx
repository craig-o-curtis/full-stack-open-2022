import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Heading } from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";
import FilterContacts from "./FilterContacts";

const Phonebook = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    { name, number }: IContact
  ) => {
    event.preventDefault();

    // ** prevent dups - pop toast
    if (contacts.some((c) => c.name === name)) {
      toast.error(
        <>
          Already added contact&nbsp;<strong>{name}</strong>
        </>
      );
      return;
    }

    // ** ultra paraoid prevent dups
    setContacts((prevContacts) =>
      !prevContacts.some((p) => p.name === name)
        ? [...prevContacts, { name, number }]
        : prevContacts
    );
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(() => newFilter);
  };

  return (
    <div>
      <Heading as="h2">Phonebook</Heading>
      <AddContactForm onSubmit={handleSubmit} />

      <Heading as="h2">Contacts:</Heading>
      {contacts.length > 0 && (
        <FilterContacts
          filter={filter}
          onChange={handleFilterChange}
          onClear={() => setFilter("")}
        />
      )}
      <Contacts contacts={contacts} filter={filter} />
      <Toaster />
    </div>
  );
};

export default Phonebook;

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";
import FilterContacts from "./FilterContacts";

const Phonebook = () => {
  const [contacts, setContacts] = useState<IContact[]>([
    { name: "Arto Hellas", number: "040-123456", id: uuidv4() },
    { name: "Ada Lovelace", number: "39-44-5323523", id: uuidv4() },
    { name: "Dan Abramov", number: "12-43-234345", id: uuidv4() },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: uuidv4() },
  ]);
  const [filter, setFilter] = useState<string>("");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    { name, number }: { name: string; number: string }
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
        ? [...prevContacts, { name, number, id: uuidv4() }]
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

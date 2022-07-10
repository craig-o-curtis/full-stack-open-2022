import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Heading } from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";

const Phonebook = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    newName: string
  ) => {
    event.preventDefault();

    // ** prevent dups - pop toast
    if (contacts.some((c) => c.name === newName)) {
      toast.error(
        <>
          Already added contact&nbsp;<strong>{newName}</strong>
        </>
      );
      return;
    }

    // ** ultra paraoid prevent dups
    setContacts((prevContacts) =>
      !prevContacts.some((p) => p.name === newName)
        ? [...prevContacts, { name: newName }]
        : prevContacts
    );
  };

  return (
    <div>
      <Heading as="h2">Phonebook</Heading>
      <AddContactForm onSubmit={handleSubmit} />

      <Heading as="h2">Contacts:</Heading>
      <Contacts contacts={contacts} />
      <Toaster />
    </div>
  );
};

export default Phonebook;

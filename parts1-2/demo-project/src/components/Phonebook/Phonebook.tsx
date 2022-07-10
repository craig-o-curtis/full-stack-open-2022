import { useState } from "react";
import { Heading } from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";

const Phonebook = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  // const [contacts, setContacts] = useState<Person[]>([{ name: "Arto Hellas" }]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    newName: string
  ) => {
    event.preventDefault();
    setContacts((prevContacts) =>
      prevContacts.some((p) => p.name === newName)
        ? prevContacts
        : [...prevContacts, { name: newName }]
    );
  };

  return (
    <div>
      <Heading as="h2">Phonebook</Heading>
      <AddContactForm onSubmit={handleSubmit} />

      <Heading as="h2">Contacts:</Heading>
      <Contacts contacts={contacts} />
    </div>
  );
};

export default Phonebook;

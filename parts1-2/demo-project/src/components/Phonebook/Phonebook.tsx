import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Heading, Loader } from "../common";
import AddContactForm from "./AddContactForm";
import Contacts from "./Contacts";
import { IContact } from "./Contact.types";
import FilterContacts from "./FilterContacts";

// ** Completed extraction already for part-2.b Exercise 2.10
const Phonebook = () => {
  const [contacts, setContacts] = useState<IContact[]>(null as any);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/contacts");
        console.log(data);
        //   setNotes(notes);
        setContacts(data);
      } catch (error) {}
    };

    getNotes();
  }, []);

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
        ? [
            ...prevContacts,
            {
              name,
              number,
              id: Math.max(...prevContacts.map((c) => c.id)) + 1,
            },
          ]
        : prevContacts
    );
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(() => newFilter);
  };

  return (
    <div>
      <Heading as="h2">Phonebook</Heading>
      {contacts ? (
        <>
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
        </>
      ) : (
        <Loader />
      )}
      <Toaster />
    </div>
  );
};

export default Phonebook;

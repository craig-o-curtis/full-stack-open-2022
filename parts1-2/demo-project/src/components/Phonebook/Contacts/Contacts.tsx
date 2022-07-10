import React, { useMemo } from "react";
import { IContact } from "../Contact.types";
import * as Styled from "./Contacts.styled";
import NoContactsMessage from "../NoContactsMessage";
import Contact from "../Contact";

interface ContactsProps {
  contacts: IContact[];
  filter: string;
}

const Contacts = ({ contacts = [], filter }: ContactsProps) => {
  const filteredContacts = useMemo(
    () =>
      filter !== ""
        ? contacts.filter((c) => c.name.includes(filter))
        : contacts,
    [contacts, filter]
  );

  return (
    <div>
      {filteredContacts.length > 0 && (
        <Styled.UL>
          {contacts.map((contact) => (
            <Contact key={contact.name} contact={contact}></Contact>
          ))}
        </Styled.UL>
      )}
      {contacts.length > 0 && filteredContacts.length === 0 && (
        <NoContactsMessage>No contacts for that filter</NoContactsMessage>
      )}
      {contacts.length === 0 && (
        <NoContactsMessage>Add a contact</NoContactsMessage>
      )}
    </div>
  );
};

export default Contacts;

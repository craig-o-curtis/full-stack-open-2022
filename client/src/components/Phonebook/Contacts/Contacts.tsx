import React, { useMemo } from "react";
import { IContact } from "../Contact.types";
import * as Styled from "./Contacts.styled";
import NoContactsMessage from "../NoContactsMessage";
import Contact from "../Contact";

interface ContactsProps {
  contacts: IContact[];
  filter: string;
  disabled: boolean;
  onDeleteContact: (contact: IContact) => void;
}

const Contacts = ({
  contacts = [],
  filter = "",
  disabled,
  onDeleteContact,
}: ContactsProps) => {
  const filteredContacts = useMemo(
    () =>
      filter !== ""
        ? contacts.filter((c) =>
            c.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contacts,
    [contacts, filter]
  );

  return (
    <div>
      {filteredContacts.length > 0 && (
        <Styled.UL>
          {filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              disabled={disabled}
              onDeleteContact={onDeleteContact}
            />
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

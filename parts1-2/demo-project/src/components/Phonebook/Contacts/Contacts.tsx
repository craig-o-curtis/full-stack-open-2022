import React from "react";
import { IContact } from "../Contact.types";
import * as Styled from "./Contacts.styled";
import NoContactsMessage from "../NoContactsMessage";
import Contact from "../Contact";

interface ContactsProps {
  contacts: IContact[];
}

const Contacts = ({ contacts = [] }: ContactsProps) => {
  return (
    <div>
      {contacts.length > 0 ? (
        <Styled.UL>
          {contacts.map((contact) => (
            <Contact key={contact.name} contact={contact}></Contact>
          ))}
        </Styled.UL>
      ) : (
        <NoContactsMessage>Add a contact</NoContactsMessage>
      )}
    </div>
  );
};

export default Contacts;

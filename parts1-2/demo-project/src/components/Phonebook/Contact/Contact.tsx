import { IContact } from "../Contact.types";
import * as Styled from "./Contact.styled";
import { IoMdContact } from "react-icons/io";
interface ContactProps {
  contact: IContact;
}

const Contact = ({ contact }: ContactProps) => (
  <Styled.Contact>
    <IoMdContact />
    <Styled.ContactText>{contact.name}</Styled.ContactText>
  </Styled.Contact>
);

export default Contact;

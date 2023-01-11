import { IContact } from '../Contact.types';
import * as Styled from './Contact.styled';
import { IoMdContact } from 'react-icons/io';
import { Button } from 'components/common';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
interface ContactProps {
  disabled?: boolean;
  contact: IContact;
  onDeleteContact: (contact: IContact) => void;
}

const Contact = ({
  disabled = false,
  contact,
  onDeleteContact,
}: ContactProps) => (
  <Styled.Contact>
    <IoMdContact />
    <Styled.ContactText>{contact.name}</Styled.ContactText>
    <Styled.ContactText>{contact.number}</Styled.ContactText>
    <Styled.ButtonWrapper>
      <Button disabled={disabled} onClick={() => onDeleteContact(contact)}>
        <IoMdRemoveCircleOutline />
        <span>Delete</span>
      </Button>
    </Styled.ButtonWrapper>
  </Styled.Contact>
);

export default Contact;

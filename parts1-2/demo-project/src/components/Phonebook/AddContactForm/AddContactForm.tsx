import React, { useState } from "react";
import { Button } from "../../common";
import { AiOutlinePlus } from "react-icons/ai";
import PhoneNumberInput from "../PhoneNumberInput";
import { IContact } from "../Contact.types";
import * as Styled from "./AddContactForm.styled";

interface AddContactFormProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    newContact: IContact
  ) => void;
}

const AddContactForm = ({ onSubmit }: AddContactFormProps) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [isPossibleNumber, setIsPossibleNumber] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(() => event.target.value);
  };
  const handleNumberChange = ({
    number,
    isPossibleNumber,
  }: {
    number: string;
    isPossibleNumber: boolean;
  }) => {
    setNewNumber(number);
    setIsPossibleNumber(isPossibleNumber);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newName.length === 0 || !newName) {
      return;
    }
    onSubmit?.(event, { name: newName, number: newNumber });
    setNewName(() => "");
    setNewNumber(() => "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.NewContactRow>
        <Styled.InputsWrapper>
          <label>
            <Styled.LabelSpan>Name:</Styled.LabelSpan>
            <input
              type="text"
              value={newName}
              placeholder="Enter a new contact"
              onChange={handleNameChange}
              required
            />
          </label>
          <Styled.Spacer />
          <PhoneNumberInput onChange={handleNumberChange} value={newNumber} />
        </Styled.InputsWrapper>

        <Styled.AddButtonWrapper>
          <Button
            type="submit"
            disabled={
              newName.length === 0 ||
              newNumber.length === 0 ||
              !isPossibleNumber
            }
          >
            <AiOutlinePlus />
            <Styled.ButtonText>Add</Styled.ButtonText>
          </Button>
        </Styled.AddButtonWrapper>
      </Styled.NewContactRow>
    </form>
  );
};

export default AddContactForm;

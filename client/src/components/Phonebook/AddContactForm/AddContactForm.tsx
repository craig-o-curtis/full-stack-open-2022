import React, { useState, useMemo } from "react";
import { Button, WarningIcon, Box } from "../../common";
import { AiOutlinePlus } from "react-icons/ai";
import PhoneNumberInput from "../PhoneNumberInput";
import * as Styled from "./AddContactForm.styled";
import { IContact } from "../Contact.types";

interface AddContactFormProps {
  contacts: IContact[];
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    newContact: { name: string; number: string }
  ) => void;
}

const AddContactForm = ({ onSubmit, contacts }: AddContactFormProps) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [isPossibleNumber, setIsPossibleNumber] = useState(false);
  const hasDupName = useMemo(
    () => contacts.some((c) => c.name === newName),
    [contacts, newName]
  );

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
          <Styled.InputWrapper>
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
            {hasDupName && (
              <Box
                flex
                flexDirection="column"
                justifyContent="flex-end"
                ml={1}
                my={0.5}
              >
                <WarningIcon />
              </Box>
            )}
          </Styled.InputWrapper>
          <Styled.Spacer />
          <Styled.InputWrapper>
            <PhoneNumberInput onChange={handleNumberChange} value={newNumber} />
          </Styled.InputWrapper>
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

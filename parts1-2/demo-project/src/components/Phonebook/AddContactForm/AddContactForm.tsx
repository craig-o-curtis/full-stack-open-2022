import React, { useState } from "react";
import { Button } from "../../common";
import { AiOutlinePlus } from "react-icons/ai";
import * as Styled from "./AddContactForm.styled";

interface AddContactFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>, newName: string) => void;
}

const AddContactForm = ({ onSubmit }: AddContactFormProps) => {
  const [newName, setNewName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(() => event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newName.length === 0 || !newName) {
      return;
    }
    onSubmit?.(event, newName);
    setNewName(() => "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.NewContactRow>
        <label>
          <Styled.LabelSpan>Name:</Styled.LabelSpan>
          <input
            type="text"
            value={newName}
            placeholder="Enter a new contact"
            onChange={handleChange}
            required
          />
        </label>

        <Styled.AddButtonWrapper>
          <Button type="submit" disabled={newName.length <= 0}>
            <AiOutlinePlus />
            <Styled.ButtonText>Add</Styled.ButtonText>
          </Button>
        </Styled.AddButtonWrapper>
      </Styled.NewContactRow>
    </form>
  );
};

export default AddContactForm;

import React from "react";
import { Button } from "../../common";
import * as Styled from "./FilterContacts.styled";

interface FilterContactsProps {
  filter: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const FilterContacts = ({ filter, onChange, onClear }: FilterContactsProps) => {
  return (
    <Styled.FilterContactRow>
      <label>
        <Styled.LabelText>Filter Contacts:</Styled.LabelText>
        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={filter}
        />
      </label>
      <Styled.ButtonWrapper>
        <Button disabled={filter === ""} onClick={onClear}>
          Clear
        </Button>
      </Styled.ButtonWrapper>
    </Styled.FilterContactRow>
  );
};

export default FilterContacts;

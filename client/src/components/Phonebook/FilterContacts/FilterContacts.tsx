import React from 'react';

import { Button } from 'components/common';

import * as Styled from './FilterContacts.styled';

interface FilterContactsProps {
  filter: string;
  disabled: boolean;
  onChange: (val: string) => void;
  onClear: () => void;
}

const FilterContacts = ({
  filter,
  disabled,
  onChange,
  onClear,
}: FilterContactsProps) => {
  return (
    <Styled.FilterContactRow>
      <label>
        <Styled.LabelText>Filter Contacts:</Styled.LabelText>
        <input
          type="text"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          value={filter}
        />
      </label>
      <Styled.ButtonWrapper>
        <Button disabled={filter === '' || disabled} onClick={onClear}>
          Clear
        </Button>
      </Styled.ButtonWrapper>
    </Styled.FilterContactRow>
  );
};

export default FilterContacts;

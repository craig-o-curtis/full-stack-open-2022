import React from "react";
import { Button } from "../../common";
import * as Styled from "./CountryFilter.styled";

interface CountryFilterProps {
  filter: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const CountryFilter = ({ filter, onChange, onClear }: CountryFilterProps) => {
  return (
    <Styled.CountryFilterRow>
      <label>
        <Styled.LabelText>Filter Countries:</Styled.LabelText>
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
    </Styled.CountryFilterRow>
  );
};

export default CountryFilter;

import styled from 'styled-components';

import { Box } from 'components/common';

export const FormControl = styled(Box)``;

export const FormControlLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

export const FormControlLabelBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const FormControlLabelRequiredError = styled(Box)`
  font-size: 0.9rem;

  &.required {
    color: rgba(0, 0, 0, 0.7);
  }
  &.error {
    color: firebrick;
  }
`;

export const FormControlLabelText = styled.div`
  margin-bottom: 0.25rem;
`;

export const FormControlLabelInput = styled.input`
  margin-bottom: 1rem;
  border: none;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.25);
  height: 1.5rem;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px 1px rgba(82, 129, 200, 0.837);
  }
`;

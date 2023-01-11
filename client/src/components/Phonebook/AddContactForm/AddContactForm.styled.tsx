import styled from 'styled-components';
import { Button } from 'components/common/Button/Button.styled';

export const NewContactRow = styled.div`
  display: flex;
  align-items: center;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const InputWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
`;

export const LabelSpan = styled.span`
  margin-right: 1rem;
`;

export const AddButtonWrapper = styled.div`
  margin-left: 1rem;
  align-self: flex-end;

  ${Button} {
    display: flex;
    &:hover,
    &:focus {
      svg {
        color: dodgerblue;
      }
    }
  }
`;

export const ButtonText = styled.span`
  margin-left: 0.25rem;
`;

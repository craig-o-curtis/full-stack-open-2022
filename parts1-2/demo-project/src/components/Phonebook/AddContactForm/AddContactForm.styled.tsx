import styled from "styled-components";
import { Button } from "../../common/Button/Button.styled";

export const NewContactRow = styled.div`
  display: flex;
  align-items: center;
`;

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LabelSpan = styled.span`
  margin-right: 1rem;
`;

export const AddButtonWrapper = styled.div`
  margin-left: 1rem;

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

export const Spacer = styled.div`
  margin: 0.5rem;
  border: 1px solid #dedede;
`;

import styled from "styled-components";
import { Button } from "../../common/Button/Button.styled";

export const NewContactRow = styled.div`
  display: flex;
  align-items: center;
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

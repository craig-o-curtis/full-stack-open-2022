import styled from "styled-components";
import { Button } from "../../common/Button/Button.styled";

export const Contact = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid skyblue;
  padding: 0.5rem;

  svg {
    color: dodgerblue;
    font-size: 1.5rem;
  }
`;

export const ContactText = styled.span`
  margin-left: 1rem;
`;

export const ButtonWrapper = styled.div`
  margin-left: auto;

  ${Button} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin-left: 0.5rem;
    }

    svg {
      color: red;
    }

    &:hover,
    &:focus {
      svg {
        color: firebrick;
      }
    }
  }
`;

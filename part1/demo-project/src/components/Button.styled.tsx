import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5rem;
  border: none;
  &:focus,
  &:hover {
    background-color: #fff;
  }
  &:hover {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

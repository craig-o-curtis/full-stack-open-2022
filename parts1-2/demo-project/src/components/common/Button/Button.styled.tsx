import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5rem;
  border: none;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:focus,
  &:hover {
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }
  &:focus {
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 4px 0px dodgerblue;
  }
  &:active {
    color: dodgerblue;
  }
  &:disabled {
    pointer-events: none;
  }
`;

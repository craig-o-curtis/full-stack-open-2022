import styled from "styled-components";
import { lighten, darken } from "polished";

export const Container = styled.div`
  background-color: ${lighten(0.2, "#FFCD64")};
  padding: 1rem;
`;

export const VoteContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    border: 1px solid ${darken(0.3, "#FFCD64")};
    background-color: white;
    color: ${darken(0.3, "#FFCD64")};
    margin-left: 2rem;
    font-weight: bold;
  }
`;

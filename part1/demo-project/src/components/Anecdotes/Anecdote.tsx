import React from "react";
import { Button } from "../common";
import * as Styled from "./Anecdote.styled";

interface AnecdoteProps {
  anecdote: string;
  onClick: () => void;
  votes: number | undefined;
}

const Anecdote = ({ anecdote, onClick, votes }: AnecdoteProps) => {
  return (
    <div>
      <p>{anecdote}</p>
      <Styled.VoteContainer>
        <p>Votes: {votes !== undefined && votes}</p>

        <Button onClick={onClick}>Vote</Button>
      </Styled.VoteContainer>
      <hr />
    </div>
  );
};

export default Anecdote;

import React from 'react';
import { Button } from 'components/common';
import * as Styled from './Anecdote.styled';
import NextAnecdoteButton from './NextAnecdoteButton';

interface AnecdoteProps {
  anecdote: string;
  onClickVote: () => void;
  onClickNext: () => void;
  votes: number | undefined;
}

const Anecdote = ({
  anecdote,
  onClickVote,
  onClickNext,
  votes,
}: AnecdoteProps) => {
  return (
    <Styled.Container>
      <p>{anecdote}</p>
      <Styled.VoteContainer>
        <p>Votes: {votes !== undefined && votes}</p>
        <Button onClick={onClickVote}>Vote</Button>
        <NextAnecdoteButton onClick={onClickNext} />
      </Styled.VoteContainer>
    </Styled.Container>
  );
};

export default Anecdote;

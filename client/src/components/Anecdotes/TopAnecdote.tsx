import React from 'react';
import { Heading } from 'components/common';
import AnecdoteDisplay from './AnecdoteDisplay';

interface TopAnecdoteProps {
  anecdote: string;
  votes: number;
}

const TopAnecdote = ({ anecdote, votes }: TopAnecdoteProps) => {
  return (
    <div>
      <Heading as="h2">Anecdote with the most votes</Heading>
      <AnecdoteDisplay anecdote={anecdote} votes={votes} />
    </div>
  );
};

export default TopAnecdote;

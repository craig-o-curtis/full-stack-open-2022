import React from 'react';

interface AnecdoteDisplayProps {
  anecdote: string;
  votes: number;
}

const AnecdoteDisplay = ({ anecdote, votes }: AnecdoteDisplayProps) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>Votes: {votes}</p>
    </div>
  );
};

export default AnecdoteDisplay;

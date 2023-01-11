import React from 'react';
import { Button } from 'components/common';

interface NextAnecdoteButtonProps {
  onClick: () => void;
}

const NextAnecdoteButton = React.memo(
  ({ onClick }: NextAnecdoteButtonProps) => {
    return <Button onClick={onClick}>Next Anecdote</Button>;
  }
);

export default NextAnecdoteButton;

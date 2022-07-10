import React, { useMemo, useState } from "react";
import { Heading, HR } from "../common";
import Anecdote from "./Anecdote";
import TopAnecdote from "./TopAnecdote";

const anecdotesTemplate = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
];

interface VoteMap {
  anecdoteIndex: number;
  anecdote: string;
  votes: number;
}

const Anecdotes = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(() =>
    Math.floor(Math.random() * anecdotesTemplate.length)
  );
  const defaultAnecdotesMap = useMemo(
    () =>
      anecdotesTemplate.map((anecdote, index) => ({
        anecdoteIndex: index,
        anecdote: anecdote,
        votes: 0,
      })),
    []
  );
  const [anecdotes, setAnecdotes] = useState<VoteMap[]>(defaultAnecdotesMap);

  const topAnecdote = useMemo(() => {
    let topVotes = [];
    const votes = anecdotes
      .map((anecdote) => anecdote.votes)
      .sort((a, b) => b - a);
    for (let i = 0; i < anecdotes.length; i++) {
      if (anecdotes[i].votes === votes[0]) {
        topVotes.push(anecdotes[i]);
      }
    }

    if (topVotes.length > 1) return undefined;
    return topVotes[0];
  }, [anecdotes]);

  const handleClickNext = () =>
    setSelectedIndex(() =>
      Math.floor(Math.random() * defaultAnecdotesMap.length)
    );

  const handleClickVote = () => {
    setAnecdotes((prevAnecdotes) => {
      const newVotes = prevAnecdotes.map((a) => {
        if (a.anecdoteIndex === selectedIndex) {
          return {
            anecdoteIndex: a.anecdoteIndex,
            anecdote: a.anecdote,
            votes: a.votes + 1,
          };
        }
        return a;
      });
      return newVotes;
    });
  };

  return (
    <div>
      <Heading as="h1">Anecdotes</Heading>
      <HR />
      <Heading as="h2">Anecdote of the Day</Heading>
      {selectedIndex !== null && (
        <Anecdote
          anecdote={anecdotesTemplate[selectedIndex]}
          onClickVote={handleClickVote}
          onClickNext={handleClickNext}
          votes={
            anecdotes.find((a) => a.anecdoteIndex === selectedIndex)?.votes
          }
        />
      )}
      <HR />
      {topAnecdote !== undefined && (
        <TopAnecdote
          anecdote={topAnecdote.anecdote}
          votes={topAnecdote.votes}
        />
      )}
      {/* {topAnecdote.anecdoteIndex !== -1 && (
        <TopAnecdote
          anecdote={topAnecdote.anecdote}
          votes={topAnecdote.votes}
        />
      )} */}
    </div>
  );
};

export default Anecdotes;

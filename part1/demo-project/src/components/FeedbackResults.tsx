import React from "react";
import styled from "styled-components";
import { FeedbackType } from "./Feedback.types";
interface Stat {
  good: number;
  neutral: number;
  bad: number;
}

const StatItem = styled.li``;
const StrongUpper = styled.strong`
  text-transform: capitalize;
`;
interface FeedbackResultsProps {
  stats: Stat;
}

const FeedbackResults = ({ stats }: FeedbackResultsProps) => {
  const total = Object.values(stats).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const averageMap: Record<string, number> = {
    good: 1,
    neutral: 0,
    bad: -1,
  };

  const average =
    Object.entries(stats).reduce((acc, [key, val]) => {
      return acc + averageMap[key] * val;
    }, 0) / total || 0;

  const positive = Number((stats.good / (total || 1)) * 100).toFixed(2);

  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        {Object.entries(stats).map(([key, value]) => (
          <StatItem key={key}>
            <StrongUpper>{key}:</StrongUpper> {value}
          </StatItem>
        ))}
        <StatItem>
          <StrongUpper>All:</StrongUpper>: {total}
        </StatItem>
        <StatItem>
          <StrongUpper>Average:</StrongUpper>: {average}
        </StatItem>
        <StatItem>
          <StrongUpper>Postiive:</StrongUpper>: {positive}%
        </StatItem>
      </ul>
    </div>
  );
};

export default FeedbackResults;

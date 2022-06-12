import React from "react";

import { FeedbackType, FeedbackStat } from "./Feedback.types";
import * as Styled from "./FeedbackStatistics.styled";

interface FeedbackStatisticsProps {
  stats: FeedbackStat;
}

const FeedbackStatistics = ({ stats }: FeedbackStatisticsProps) => {
  const total = Object.values(stats).reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  const averageMap: Record<FeedbackType, number> = {
    good: 1,
    neutral: 0,
    bad: -1,
  };

  const average = Number(
    Object.entries(stats).reduce((acc, [statKey, statVal]) => {
      return acc + averageMap?.[statKey as FeedbackType] * statVal;
    }, 0) / total || 0
  ).toFixed(2);

  const positive = Number((stats.good / (total || 1)) * 100).toFixed(2);

  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <ul>
          {Object.entries(stats).map(([key, value]) => (
            <Styled.StatItem key={key}>
              <Styled.StrongUpper>{key}:</Styled.StrongUpper> {value}
            </Styled.StatItem>
          ))}
          <Styled.StatItem>
            <Styled.StrongUpper>All:</Styled.StrongUpper>: {total}
          </Styled.StatItem>
          <Styled.StatItem>
            <Styled.StrongUpper>Average:</Styled.StrongUpper>: {average}
          </Styled.StatItem>
          <Styled.StatItem>
            <Styled.StrongUpper>Positive:</Styled.StrongUpper>: {positive}%
          </Styled.StatItem>
        </ul>
      )}
    </div>
  );
};

export default FeedbackStatistics;

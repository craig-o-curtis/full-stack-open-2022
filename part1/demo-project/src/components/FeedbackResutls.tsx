import React from "react";
import styled from "styled-components";

interface Stat {
  good: number;
  neutral: number;
  bad: number;
}

const StatItem = styled.li``;

interface FeedbackResultsProps {
  stats: Stat;
}

const FeedbackResults = ({ stats }: FeedbackResultsProps) => {
  return (
    <div>
      <h2>Statistics</h2>
      <ul>
        {Object.entries(stats).map(([key, value]) => (
          <StatItem key={key}>
            <strong>{key}:</strong> {value}
          </StatItem>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackResults;

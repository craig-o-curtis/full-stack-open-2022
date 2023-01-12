import React, { useMemo } from 'react';

import { FeedbackStat, FeedbackType } from './Feedback.types';
import StatisticsTable from './StatisticsTable';

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

  const statisticRows = useMemo(() => {
    if (total === 0) {
      return [];
    }
    return [
      ...Object.entries(stats).map(([key, value]) => ({
        label: key,
        stat: value,
      })),
      { label: 'All', stat: total },
      { label: 'Average', stat: average },
      { label: 'Positive', stat: `${positive}%` },
    ];
  }, [average, positive, stats, total]);

  return (
    <div>
      <StatisticsTable title="Statistics" statisticRows={statisticRows} />
    </div>
  );
};

export default FeedbackStatistics;

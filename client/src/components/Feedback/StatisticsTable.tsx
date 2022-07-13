import React from "react";
import StatisticLine from "./StatisticLine";
import * as Styled from "./StatisticsTable.styled";

interface StatisticRow {
  label: string;
  stat: string | number;
}

interface StatisticsTableProps {
  title: string;
  statisticRows: StatisticRow[];
}

const StatisticsTable = ({
  title,
  statisticRows = [],
}: StatisticsTableProps) => {
  return (
    <Styled.TABLE>
      <Styled.THEAD>
        <Styled.TR>
          <Styled.TH colSpan={2}>{title}</Styled.TH>
        </Styled.TR>
      </Styled.THEAD>
      <Styled.TBODY>
        {statisticRows.length > 0 ? (
          statisticRows.map((sr) => (
            <StatisticLine key={sr.label} label={sr.label} stat={sr.stat} />
          ))
        ) : (
          <StatisticLine label="Warning" stat="No feedback given" />
        )}
      </Styled.TBODY>
    </Styled.TABLE>
  );
};

export default StatisticsTable;

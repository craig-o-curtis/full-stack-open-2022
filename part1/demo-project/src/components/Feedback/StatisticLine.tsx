import * as Styled from "./StatisticLine.styled";
import { TR, TD } from "./StatisticsTable.styled";

interface StatisticLineProps {
  label: string;
  stat: string | number;
}

const StatisticLine = ({ label, stat }: StatisticLineProps) => {
  return (
    <TR>
      <TD>
        <Styled.StrongUpper>{label}:</Styled.StrongUpper>{" "}
      </TD>
      <TD>{stat}</TD>
    </TR>
  );
};

export default StatisticLine;

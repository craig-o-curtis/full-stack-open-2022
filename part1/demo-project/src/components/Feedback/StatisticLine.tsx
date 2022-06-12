import * as Styled from "./StatisticLine.styled";

interface StatisticLineProps {
  label: string;
  stat: string | string;
}

const StatisticLine = ({ label, stat }: StatisticLineProps) => {
  return (
    <Styled.StatItem>
      <Styled.StrongUpper>{label}:</Styled.StrongUpper> {stat}
    </Styled.StatItem>
  );
};

export default StatisticLine;

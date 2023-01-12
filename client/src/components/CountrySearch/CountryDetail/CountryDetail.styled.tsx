import styled from 'styled-components';

export const CountryDetail = styled.div`
  margin-bottom: 1rem;
`;

export const HeadingText = styled.span`
  margin-right: 1rem;
`;

export const CountryBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const CountryBoxChild = styled.div`
  flex: 1 1 50%;
`;

interface GridProps {
  cols?: number;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols || 1}, 1fr)`};
  grid-gap: 4px;
  background-color: #dedede;
  padding: 4px;
`;

Grid.defaultProps = {
  cols: 1,
};

export const GridItem = styled.div`
  padding: 8px;
  background-color: white;
`;

export const UL = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
export const LI = styled.li`
  padding: 0;
  margin: 0;
`;

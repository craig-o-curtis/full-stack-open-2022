import { Box, Button } from 'components/common';
import styled from 'styled-components';

const Bada55 = '#bada55';

export const MainBox = styled(Box)`
  background-color: ${Bada55};
  font-size: 2rem;
`;
export const InnerBox = styled(Box)`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
export const EvenSteven = styled(Box)`
  flex: 1 0 auto;
  background-color: black;
  color: ${Bada55};
  text-align: center;
`;
export const EventButton = styled(Button)`
  flex: 1 0 auto;
`;

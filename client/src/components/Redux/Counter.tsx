import React from 'react';

import { Box, Button, Heading } from '../common';
import type { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './store/counterSlice';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Bada55 = '#bada55';

const MainBox = styled(Box)`
  background-color: ${Bada55};
  font-size: 2rem;
`;
const InnerBox = styled(Box)`
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const EvenSteven = styled(Box)`
  flex: 1 0 auto;
  background-color: black;
  color: ${Bada55};
  text-align: center;
`;
const EventButton = styled(Button)`
  flex: 1 0 auto;
`;

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <Box mt={2} flex flexDirection="column">
      <Heading as="h2">Counter Example:</Heading>
      <MainBox flex justifyContent="center">
        <InnerBox flex m={2}>
          <EventButton
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            <FaMinus />
          </EventButton>
          <EvenSteven p={2}>{count}</EvenSteven>

          <EventButton
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            <FaPlus />
          </EventButton>
        </InnerBox>
      </MainBox>
    </Box>
  );
};

export default Counter;

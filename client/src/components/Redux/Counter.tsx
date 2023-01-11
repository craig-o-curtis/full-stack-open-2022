import React from 'react';

import { Box, Heading } from '../common';
import type { RootState } from './store';
import { useAppDispatch, useAppSelector } from './store';
import { decrement, increment } from './store/counterSlice';

import { FaPlus, FaMinus } from 'react-icons/fa';
import * as Styled from './Counter.styled';

const Counter = () => {
  const count = useAppSelector((state: RootState) => state.counter.value);

  const dispatch = useAppDispatch();

  return (
    <Box mt={2} flex flexDirection="column">
      <Heading as="h2">Counter Example:</Heading>

      <Styled.MainBox flex justifyContent="center">
        <Styled.InnerBox flex m={2}>
          <Styled.EventButton
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            <FaMinus />
          </Styled.EventButton>
          <Styled.EvenSteven p={2}>{count}</Styled.EvenSteven>

          <Styled.EventButton
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            <FaPlus />
          </Styled.EventButton>
        </Styled.InnerBox>
      </Styled.MainBox>
    </Box>
  );
};

export default Counter;

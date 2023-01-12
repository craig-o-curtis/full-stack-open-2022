import React from 'react';

import { Box, Button, Heading } from 'components/common';

import { useAppDispatch, useAppSelector } from './store';
import { rate, reset } from './store/ratingSlice';
import type { RootState } from './store/store';

const Rating = () => {
  const rating = useAppSelector((state: RootState) => state.rating.value);
  const dispatch = useAppDispatch();
  console.log('rating', rating);

  return (
    <Box mt={2} flex flexDirection="column">
      <Heading as="h2">Rating Example:</Heading>
      <Box as="p">Rating: {rating ? rating : '-'}</Box>
      <Box flex>
        <Button onClick={() => dispatch(rate('bad'))}>Bad</Button>
        <Button onClick={() => dispatch(rate('ok'))}>Ok</Button>
        <Button onClick={() => dispatch(rate('good'))}>Good</Button>
        <Button onClick={() => dispatch(reset())}>Reset</Button>
      </Box>
    </Box>
  );
};

export default Rating;

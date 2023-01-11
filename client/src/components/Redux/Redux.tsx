import React from 'react';
import {
  AppLoader,
  Banner,
  Heading,
  NavButton,
  Box,
  Overflow,
  OverflowLock,
} from 'components/common';
import Counter from './Counter';
import Rating from './Rating';

import { StoreProvider } from './store';

const Redux = () => {
  return (
    <StoreProvider>
      <AppLoader isLoading={false}>
        <OverflowLock>
          <Box p={2} flex justifyContent="space-between">
            <Heading as="h1">Part 6 - Redux</Heading>
            <NavButton />
          </Box>
          <Overflow>
            <Box p={2}>
              <Banner variant="info">This uses Redux Toolkit</Banner>
              {/* // ** Counter */}
              <Counter />
              {/* // ** Rating */}
              <Rating />
            </Box>
          </Overflow>
        </OverflowLock>
      </AppLoader>
    </StoreProvider>
  );
};

export default Redux;

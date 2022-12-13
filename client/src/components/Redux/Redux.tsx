import React from 'react';
import {
  AppLoader,
  Banner,
  Heading,
  Box,
  Overflow,
  OverflowLock,
} from '../common';
import Counter from './Counter';

import { StoreProvider } from './store';

const Redux = () => {
  return (
    <StoreProvider>
      <AppLoader isLoading={false}>
        <OverflowLock>
          <Box p={2}>
            <Heading as="h1">Part 6 - Redux</Heading>
          </Box>
          <Overflow>
            <Box p={2}>
              <Banner variant="info">This uses Redux Toolkit</Banner>
              <Counter />
            </Box>
          </Overflow>
        </OverflowLock>
      </AppLoader>
    </StoreProvider>
  );
};

export default Redux;

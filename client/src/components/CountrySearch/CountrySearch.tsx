import React, { useState } from 'react';
import {
  Heading,
  OverflowLock,
  Overflow,
  Loader,
  Banner,
} from 'components/common';
import { useCountryQuery } from './hooks';
import CountryHeaderBar from './CountryHeaderBar';
import CountryFilter from './CountryFilter';
import Countries from './Countries';

const CountrySearch = () => {
  const [filter, setFilter] = useState<string>('');

  const { data: countries, isLoading, isError, error } = useCountryQuery();

  const handleFilterChange = (newFilter: string) => {
    setFilter(() => newFilter);
  };

  return (
    <OverflowLock>
      <CountryHeaderBar>
        <Heading>CountrySearch</Heading>
        <CountryFilter
          filter={filter}
          onChange={handleFilterChange}
          onClear={() => setFilter('')}
        />
      </CountryHeaderBar>

      <Overflow>
        {isLoading && <Loader />}
        {isError && error && <Banner variant="danger">{error.message}</Banner>}
        {countries && <Countries countries={countries} filter={filter} />}
      </Overflow>
    </OverflowLock>
  );
};

export default CountrySearch;

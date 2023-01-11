import { useMemo } from 'react';
import CountryDetail from '../CountryDetail';
import { ICountry } from '../Country.types';
import { Banner } from 'components/common';
import * as Styled from './Countries.styled';

interface CountriesProps {
  countries: ICountry[];
  filter: string;
}

const Countries = ({ countries = [], filter }: CountriesProps) => {
  const filteredCountries = useMemo(
    () =>
      filter === ''
        ? countries
        : countries.filter((c) =>
            c?.name?.common?.toLowerCase().includes(filter.toLowerCase())
          ),
    [countries, filter]
  );

  if (countries.length === 0) return null;
  return (
    <Styled.Countries>
      {filteredCountries.length === 0 && filter !== '' ? (
        <Banner variant="warning">Please refine your search</Banner>
      ) : (
        filteredCountries.map((country) => (
          <CountryDetail
            key={country?.name?.common}
            country={country}
            showDefault={filteredCountries.length === 1}
          />
        ))
      )}
    </Styled.Countries>
  );
};

export default Countries;

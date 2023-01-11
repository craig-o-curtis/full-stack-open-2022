import React, { useState, useEffect } from 'react';
import { ICountry } from '../Country.types';
import { Heading, Image, Button } from 'components/common';
import CapitalWeather from '../CapitalWeather';
import * as Styled from './CountryDetail.styled';

interface CountryDetailProps {
  country: ICountry;
  showDefault: boolean;
}

const CountryDetail = ({ country, showDefault }: CountryDetailProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const showWeather =
    country.capital &&
    country?.capital[0] !== undefined &&
    country?.capitalInfo?.latlng !== undefined;

  useEffect(() => {
    setShowDetails(showDefault);
  }, [showDefault]);

  return (
    <Styled.CountryDetail>
      <Heading as="h2">
        <Styled.HeadingText>{country?.name?.common}</Styled.HeadingText>
        <Button onClick={() => setShowDetails((prev) => !prev)}>
          {!showDetails ? 'Show' : 'Hide'}
        </Button>
      </Heading>

      {showDetails && (
        <Styled.CountryBox>
          <Styled.CountryBoxChild>
            <Styled.Grid cols={2}>
              <Styled.GridItem>
                <strong>Capital:</strong>{' '}
              </Styled.GridItem>
              <Styled.GridItem>{country.capital}</Styled.GridItem>
              <Styled.GridItem>
                <strong>Area:</strong>{' '}
              </Styled.GridItem>
              <Styled.GridItem>{country.area}</Styled.GridItem>
              <Styled.GridItem>
                <strong>Languages:</strong>{' '}
              </Styled.GridItem>
              <Styled.GridItem>
                <Styled.UL>
                  {Object.values(country?.languages ?? {}).map((l) => (
                    <Styled.LI key={l}>{l}</Styled.LI>
                  ))}
                </Styled.UL>
              </Styled.GridItem>
            </Styled.Grid>

            {showWeather && (
              <CapitalWeather
                capital={(country?.capital || [])[0]}
                latlong={country?.capitalInfo?.latlng as number[]}
              />
            )}
          </Styled.CountryBoxChild>
          <Styled.CountryBoxChild>
            <Styled.Grid cols={1}>
              <Styled.GridItem>
                <Image
                  src={country?.flags?.png as string}
                  alt={`flag of ${country?.name?.common}`}
                />
              </Styled.GridItem>
            </Styled.Grid>
          </Styled.CountryBoxChild>
        </Styled.CountryBox>
      )}
    </Styled.CountryDetail>
  );
};

export default CountryDetail;

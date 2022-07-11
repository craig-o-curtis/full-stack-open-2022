import React from "react";
import { Heading } from "../../common";
import { ICountry } from "../Country.types";

interface CountryProps {
  country: ICountry;
}

const Country = ({ country }: CountryProps) => {
  return (
    <div>
      <Heading as="h2">{country.name?.common}</Heading>
    </div>
  );
};

export default Country;

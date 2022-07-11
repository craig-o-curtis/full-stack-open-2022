import { useQuery } from "react-query";
import axios from "axios";
import { ICountry } from "../Country.types";

const queryKey = "Countries";

const getCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    // noop
  }
};

export const useCountryQuery = () => {
  const { data, isLoading, isError, error } = useQuery<ICountry[], Error>(
    queryKey,
    getCountries
  );
  return { data, isLoading, isError, error };
};

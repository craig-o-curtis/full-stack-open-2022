import { useQuery } from "react-query";
import axios from "axios";

const queryKey = "Countries";

const getCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    // noop
  }
};
getCountries();

export const useCountryQuery = () => {
  const { data, isLoading, isError, error } = useQuery(queryKey, getCountries);
  return { data, isLoading, isError, error };
};

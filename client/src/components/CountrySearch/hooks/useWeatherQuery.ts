import { useQuery } from "react-query";
import axios from "axios";
import { IWeather } from "../Weather.types";

const queryKey = "Weather";

const getWeather = async (lat: number, long: number) => {
  if (lat === undefined || long === undefined) {
    return;
  }
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    );
    return response.data;
  } catch (error) {
    // noop
    throw error;
  }
};

export const useWeatherQuery = (capital: string, lat: number, long: number) => {
  const { data, isLoading, isError, error } = useQuery<IWeather, Error>(
    [queryKey, capital],
    () => getWeather(lat, long)
  );
  return { data, isLoading, isError, error };
};

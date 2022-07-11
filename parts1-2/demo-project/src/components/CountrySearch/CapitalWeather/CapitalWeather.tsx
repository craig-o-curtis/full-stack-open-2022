import { useMemo } from "react";
import { Heading, Loader, Banner, Image } from "../../common";
import { useWeatherQuery } from "../hooks";
import * as Styled from "./CapitalWeather.styled";

interface CapitalWeatherProps {
  latlong: number[];
  capital: string;
}

const CapitalWeather = ({ latlong, capital }: CapitalWeatherProps) => {
  const { isLoading, isError, error, data } = useWeatherQuery(
    capital,
    latlong[0],
    latlong[1]
  );
  const imageUrl = useMemo(
    () =>
      data?.weather?.[0]?.icon !== undefined
        ? `http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`
        : null,
    [data?.weather]
  );

  console.log("imageIconUrl", imageUrl);

  const convertKelvinToCelcius = (kelvin: number = 0) => {
    const converstion = 273.15;

    return Math.round(kelvin - converstion);
  };

  return (
    <Styled.CapitalWeather>
      <Heading as="h3">Weather in {capital}</Heading>
      {isLoading && <Loader />}
      {isError && error && <Banner variant="danger">{error.message}</Banner>}

      <Banner variant="info">
        <p>
          <strong>Temp:</strong> {convertKelvinToCelcius(data?.main.temp)}
          &#8451;
        </p>
        <p>
          <strong>{data?.weather?.[0].main}: </strong>
          {data?.weather?.[0].description}
        </p>
        {imageUrl && (
          <Styled.ImageWrapper>
            <Image
              src={imageUrl}
              alt={`Icon representing ${data?.weather?.[0].description}`}
            />
          </Styled.ImageWrapper>
        )}
        <p>
          <strong>Wind:</strong> {data?.wind.deg} deg {data?.wind.speed} m/s
        </p>
      </Banner>
    </Styled.CapitalWeather>
  );
};

export default CapitalWeather;

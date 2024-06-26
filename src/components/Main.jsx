
import useForecast from "../hooks/useForecast";
import WeatherSection from "./WeatherSection";
import ForecastList from "./ForecastList";
import useWeather from "../hooks/useWeather";

export default function Main({ city }) {
  if (!city) {
    return (
      <main className="max-w-screen-md p-4 flex flex-1 flex-col justify-center items-center">
        <section className="w-auto h-32 p-4 flex flex-col justify-center items-center border border-white border-opacity-25 rounded-xl bg-white bg-opacity-25 shadow-[0_0_16px_0_rgba(255,255,255,0.25)] backdrop-blur">
          <span className="text-xl">Please enter the city name in search bar 👆</span>
        </section>
      </main>
    );
  }

  const { weatherData, weatherLoading, weatherError } = useWeather({ city });
  const { forecastData, forecastLoading, forecastError } = useForecast({
    city,
  });

  return (
    <main className="max-w-screen-md p-4 flex flex-1 flex-col justify-center items-center gap-4">
      {weatherLoading && forecastLoading && (
        <img className="w-32" src="loading.svg" alt="Loading"></img>
      )}
      {weatherError && forecastError && (
        <section className="w-auto h-32 p-4 flex flex-col justify-center items-center border border-error border-opacity-75 rounded-xl bg-error bg-opacity-75 shadow-[0_0_16px_0_rgba(255,0,0,0.75)] backdrop-blur">
          <span className="text-xl">Not found</span>
          <span className="opacity-75">There is no city like "{city}"</span>
        </section>
      )}
      {!weatherLoading && !weatherError && (
        <WeatherSection weatherData={weatherData} />
      )}
      {!forecastLoading && !forecastError && (
        <ForecastList forecastData={forecastData} />
      )}
    </main>
  );
}

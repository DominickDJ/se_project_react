import { latitude, APIkey, longitude } from "./constants";
import { checkServerResponse } from "./api";
export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const celsius = Math.round(((temperature - 32) * 5) / 9);
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: celsius,
    },
  };
  return weather;
};

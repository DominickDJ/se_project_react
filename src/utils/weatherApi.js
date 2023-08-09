import { latitude, APIkey, longitude } from "./constants";
export const getForecastWeather = () => {
  const processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(processServerResponse);
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  return Math.ceil(temp);
};

export const getForecastWeather = () => {
  const latitude = 44.34;
  const longitude = 10.99;
  const APIkey = "504829a367e76e0ee9ee141984a6840d";
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  return Math.ceil(temp);
};

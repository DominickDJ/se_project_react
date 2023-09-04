import React, { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find(
    (option) => option.day === day && option.type === type
  );
  const imageSrcUrl = weatherOption?.url || "";

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperatureUnit = currentTemperatureUnit === "F" ? "°F" : "°C";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}
        <span className="temperature-unit">{temperatureUnit}</span>
      </div>
      <img src={imageSrcUrl} className="weather__image" alt="weather-logo" />
    </section>
  );
};

export default WeatherCard;

import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find(
    (option) => option.day === day && option.type === type
  );
  const imageSrcUrl = weatherOption?.url || "";

  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}°F</div>
      <img src={imageSrcUrl} className="weather__image" alt="weather-logo" />
    </section>
  );
};

export default WeatherCard;

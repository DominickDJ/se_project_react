import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

export default function Main({ weatherTemp, onSelectedCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const getWeatherType = (weatherTemp) => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType(weatherTemp);

  const filterCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="snow" weatherTemp={temp} />
      <section className="card__section" id="cardSection">
        Today is {temp}°F / You may want to wear:
        <div className="card__items">
          {defaultClothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectedCard={onSelectedCard}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../../CurrentTemperatureUnitContext/CurrentTempUnitContext";
import ClothingList from "../ClothingList/ClothingList";
import { getWeatherType } from "../../utils/constants";
export default function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const weatherType = getWeatherType(weatherTemp?.temperature?.F);
  const filterCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });
  return (
    <main className="main">
      <WeatherCard day={true} type="snow" weatherTemp={temp} />
      <section className="card__section" id="cardSection">
        Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        <ClothingList
          onSelectedCard={onSelectedCard}
          clothingItems={filterCards}
        />
      </section>
    </main>
  );
}

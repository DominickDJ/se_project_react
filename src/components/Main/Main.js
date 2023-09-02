import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import ClothingList from "../ClothingList/ClothingList";

export default function Main({ weatherTemp, onSelectedCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  return (
    <main className="main">
      <WeatherCard day={true} type="snow" weatherTemp={temp} />
      <section className="card__section" id="cardSection">
        Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        <ClothingList
          weatherTemp={weatherTemp}
          onSelectedCard={onSelectedCard}
          clothingItems={clothingItems}
        />
      </section>
    </main>
  );
}

import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import { getWeatherType } from "../../utils/constants";
const ClothingList = ({ weatherTemp, onSelectedCard, clothingItems }) => {
  const weatherType = getWeatherType(weatherTemp?.temperature?.F);
  const filterCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <section className="cl">
      <div className="card__items">
        {filterCards.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectedCard={onSelectedCard}
          />
        ))}
      </div>
    </section>
  );
};

export default ClothingList;

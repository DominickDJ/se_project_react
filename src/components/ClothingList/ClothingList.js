import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothingList.css";
const ClothingList = ({ onSelectedCard, clothingItems }) => {
  return (
    <section className="clothing__section" id="cardSection">
      <div className="card__items">
        {clothingItems.map((item, index) => (
          <ItemCard key={index} item={item} onSelectedCard={onSelectedCard} />
        ))}
      </div>
    </section>
  );
};

export default ClothingList;

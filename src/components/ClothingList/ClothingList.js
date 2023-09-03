import React from "react";
import ItemCard from "../ItemCard/ItemCard";

const ClothingList = ({ onSelectedCard, clothingItems }) => {
  return (
    <section className="clothing__section" id="cardSection">
      <div className="card__items">
        {clothingItems.map((item) => (
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

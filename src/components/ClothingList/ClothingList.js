import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothingList.css";
const ClothingList = ({
  isLoggedIn,
  onSelectedCard,
  clothingItems,
  handleLikeClick,
}) => {
  return (
    <section className="clothing__section" id="cardSection">
      <div className="card__items">
        {clothingItems.map((item, key) => (
          <ItemCard
            handleLikeClick={handleLikeClick}
            key={key}
            item={item}
            isLoggedIn={isLoggedIn}
            onSelectedCard={onSelectedCard}
          />
        ))}
      </div>
    </section>
  );
};

export default ClothingList;

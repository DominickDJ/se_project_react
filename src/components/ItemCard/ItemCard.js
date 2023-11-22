import React, { useState } from "react";

const ItemCard = ({ item, onSelectedCard, currentUser }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };

  const [isLiked, setIsLiked] = useState(() => {
    if (currentUser && currentUser._id) {
      return item.likes.some((id) => id === currentUser._id);
    }
    return false;
  });

  const onlikeClick = () => {
    setIsLiked(!isLiked);
  };

  const itemLikeButtonClassName = `like-button ${
    isLiked ? "like-button_clicked" : ""
  }`;

  return (
    <div>
      <div>
        <img
          alt="card"
          className="card__image image__preview"
          onClick={handleCardClick}
          src={item.imageUrl}
        />
      </div>
      <div className="card__description-like">
        <div className="card__name">{item.name}</div>
        <button
          className={itemLikeButtonClassName}
          onClick={onlikeClick}
        ></button>
      </div>
    </div>
  );
};

export default ItemCard;

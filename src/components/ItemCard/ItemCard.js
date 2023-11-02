import React, { useState } from "react";

const ItemCard = ({ item, onSelectedCard, currentUser, onCardLike }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };

  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser._id)
  );

  const handleLikeClick = () => {
    onCardLike(item);
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
          className="card__image"
          onClick={handleCardClick}
          src={item.imageUrl}
        />
      </div>
      <div className="card__name">{item.name}</div>
      {currentUser ? (
        <button className={itemLikeButtonClassName} onClick={handleLikeClick}>
          Like
        </button>
      ) : null}
    </div>
  );
};

export default ItemCard;

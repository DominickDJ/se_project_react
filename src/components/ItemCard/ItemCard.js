import React, { useState } from "react";

const ItemCard = ({ item, onSelectedCard, currentUser, onCardLike }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };

  const [isLiked, setIsLiked] = useState(() => {
    if (currentUser && currentUser._id) {
      return item.likes.some((id) => id === currentUser._id);
    }
    return false;
  });

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
      <div className="card__description-like">
        <div className="card__name">{item.name}</div>
        <button
          // className={itemLikeButtonClassName}
          className="like-button"
          onClick={handleLikeClick}
        ></button>
      </div>

      {/* {currentUser && currentUser._id ? (
        
      ) : null} */}
    </div>
  );
};

export default ItemCard;

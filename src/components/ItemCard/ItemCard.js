import React, { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ isLoggedIn, item, onSelectedCard, handleLikeClick }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onSelectedCard(item);
  };

  const [isLiked, setIsLiked] = useState(() => {
    if (currentUser && currentUser._id) {
      return item.likes.some((id) => id === currentUser._id);
    }
    return false;
  });

  const onLikeClick = () => {
    setIsLiked(!isLiked);
    handleLikeClick({ id: item._id, isLiked: isLiked });
  };

  const itemLikeButtonClassName = `like-button ${
    isLiked ? "like-button_clicked" : ""
  }`;

  return (
    <div>
      <div>
        <img
          alt={item.name}
          className="card__image image__preview"
          onClick={handleCardClick}
          src={item.imageUrl}
        />
      </div>
      <div className="card__description-likes">
        <div className="card__name card_item">{item.name}</div>
        {isLoggedIn ? (
          <button
            className={itemLikeButtonClassName}
            onClick={onLikeClick}
          ></button>
        ) : null}
      </div>
    </div>
  );
};

export default ItemCard;

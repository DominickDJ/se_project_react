import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, setActiveModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner._id === currentUser._id;

  const handleOpenDeleteModal = () => {
    setActiveModal("ConfirmModal");
  };

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className={`modal`}>
      <div className="modal__content modal__content-image">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt="modalImage"
        />
        <div className="modal__description">
          <div>{selectedCard.name}</div>
          <div>{selectedCard.weather}</div>
          <button
            className={itemDeleteButtonClassName}
            onClick={handleOpenDeleteModal}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

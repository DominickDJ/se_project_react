import React from "react";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(selectedCard);
  };

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
          <div> {selectedCard.weather}</div>
          <button className="modal__delete-button" onClick={handleDelete}>
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

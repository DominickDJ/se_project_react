import React from "react";
import "./ItemModal.css";

const ItemModal = ({
  selectedCard,
  setActiveModal,
  buttonText,
  handleCloseModal,
  onClose,
  currentUser,
}) => {
  const handleOpenDeleteModal = () => {
    setActiveModal("ConfirmModal");
  };

  const renderDeleteButton = () => {
    if (currentUser._id === selectedCard.owner) {
      return (
        <button
          onClick={handleOpenDeleteModal}
          onClose={handleCloseModal}
          className="item__delete-button"
        >
          Delete
        </button>
      );
    }
    return null;
  };

  return (
    <div className="modal" onClose={onClose}>
      <div className="modal__item-content">
        <div className="item__delete-button">{renderDeleteButton()}</div>
        <button className="modal__close-button" onClick={onClose}></button>
        <img
          className="modal__image image_preview"
          src={selectedCard.imageUrl}
          alt="modalImage"
        />
        <div className="modal__description">
          <div>{selectedCard.name}</div>
          <div>{selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

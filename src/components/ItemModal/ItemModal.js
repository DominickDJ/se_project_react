import React from "react";

import "./ItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const ItemModal = ({
  selectedCard,
  setActiveModal,
  isOpen,
  buttonText,
  handleCloseModal,
  onClose,
}) => {
  const handleOpenDeleteModal = () => {
    setActiveModal("ConfirmModal");
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      <img
        className="modal__image"
        src={selectedCard.imageUrl}
        alt="modalImage"
      />
      <div className="modal__description">
        <div>{selectedCard.name}</div>
        <div>{selectedCard.weather}</div>
      </div>
      <button
        onClick={handleOpenDeleteModal}
        onClose={handleCloseModal}
        className="item__delete-button"
      >
        Delete
      </button>
    </ModalWithForm>
  );
};

export default ItemModal;

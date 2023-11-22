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
  isLoggedIn,
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
    <ModalWithForm
      buttonText={buttonText}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onClose={onClose}
    >
      <img
        className="modal__image image_preview"
        src={selectedCard.imageUrl}
        alt="modalImage"
      />
      <div className="modal__description">
        <div>{selectedCard.name}</div>
        <div>{selectedCard.weather}</div>
      </div>
      {renderDeleteButton()}
    </ModalWithForm>
  );
};

export default ItemModal;

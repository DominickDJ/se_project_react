import React, { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({
  selectedCard,
  setActiveModal,
  handleCloseModal,
  onClose,
}) => {
  const handleOpenDeleteModal = () => {
    setActiveModal("ConfirmModal");
  };
  const { currentUser } = useContext(CurrentUserContext);
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
    <div className="modal item_modal" onClose={onClose}>
      <div className="modal__item-content">
        <button className="modal__close-button" onClick={onClose}></button>
        <img
          className="modal__image image_preview"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__description">
          <h3>{selectedCard.name}</h3>
          <p>{selectedCard.weather}</p>
          <div className="item__delete-button">{renderDeleteButton()}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

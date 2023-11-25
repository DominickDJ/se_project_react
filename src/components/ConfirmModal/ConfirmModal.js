import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ConfirmModal.css";
import "../ModalWithForm/ModalWithForm.css";

const ConfirmModal = ({
  onClose,
  isOpen,
  buttonText,
  onDelete,
  selectedCard,
}) => {
  const [isLoading] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(selectedCard);
  };
  return (
    <ModalWithForm
      buttonText={buttonText}
      title=""
      onClose={onClose}
      isOpen={isOpen}
      isLoading={isLoading}
    >
      <div className="modal__confirm-title">
        Are you sure you want to delete this item?
        <span>This action is irreversible.</span>
      </div>
      <div className="modal__confirm">
        <button
          type="submit"
          className="modal__confirm-button"
          disabled={isLoading}
          onClick={handleDelete}
        >
          {isLoading ? "Loading..." : "Yes, delete item"}
        </button>
        <button type="text" className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </ModalWithForm>
  );
};

export default ConfirmModal;

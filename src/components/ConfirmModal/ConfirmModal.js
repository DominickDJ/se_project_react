import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ConfirmModal.css";

const ConfirmModal = ({
  onClose,
  isOpen,
  buttonText,
  onDelete,
  selectedCard,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    onDelete(selectedCard);
  };
  return (
    <div>
      <ModalWithForm
        buttonText={buttonText}
        title=""
        onClose={onClose}
        isOpen={isOpen}
        isLoading={isLoading}
      >
        <div className="modal__label-input">
          <div>
            <div className="modal__confirm">
              Are you sure you want to delete this item?
              <div> This action is irreversible.</div>
            </div>
            <button
              type="submit"
              className="modal__submit-button"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading ? "Loading..." : "Yes, delete item"}
            </button>
            <button type="text" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default ConfirmModal;

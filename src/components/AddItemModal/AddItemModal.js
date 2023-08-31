import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const hanndleNameChange = (e) => {
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const hanndleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link });
  };
  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__label-input">
        <label className="modal__label">
          <span>Name</span>
          <input
            className="modal__input"
            placeholder="Name"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            value={name}
            onChange={hanndleNameChange}
          />
        </label>
        <label className="modal__label">
          <span>Image</span>
          <input
            className="modal__input"
            placeholder="Image"
            type="url"
            name="link"
            minLength="1"
            maxLength="30"
            value={link}
            onChange={hanndleUrlChange}
          />
        </label>
      </div>
      <p>Select weather type:</p>
      <div className="modal__input modal__input-radio">
        <div>
          <input type="radio" id="hot" value="hot" name="input" />
          <label>Hot</label>
        </div>
        <div>
          <input type="radio" id="warm" value="warm" name="input" />
          <label>Warm</label>
        </div>
        <div>
          <input type="radio" id="cold" value="cold" name="input" />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

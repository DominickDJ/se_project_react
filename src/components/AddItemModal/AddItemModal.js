import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen, buttonText }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const [isLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
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
            value={name}
            onChange={handleNameChange}
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
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <p>Select weather type:</p>
      <div className="modal__input modal__input-radio">
        <div>
          <input
            type="radio"
            id="hot"
            value="hot"
            name="input"
            onChange={handleWeatherChange}
          />
          <label>Hot</label>
        </div>
        <div>
          <input
            type="radio"
            id="warm"
            value="warm"
            name="input"
            onChange={handleWeatherChange}
          />
          <label>Warm</label>
        </div>
        <div>
          <input
            type="radio"
            id="cold"
            value="cold"
            name="input"
            onChange={handleWeatherChange}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

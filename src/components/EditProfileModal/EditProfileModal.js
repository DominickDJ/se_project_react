import React, { useContext, useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  onProfileSubmit,
  onClose,
  buttonText,
  isOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileSubmit(name, avatar);
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="modal__label-input">
        <label className="modal__label">
          <span> Name*</span>
          <input
            className="modal__input"
            placeholder="Name"
            minLength="1"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label-input">
          <span>Avatar</span>
          <input
            className="modal__input"
            placeholder="Avatar"
            minLength="1"
            type="text"
            value={avatar}
            onChange={handleAvatarChange}
          />
        </label>
        <button
          type="submit"
          className="modal__submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Save changes"}
        </button>
      </div>
    </ModalWithForm>
  );
}

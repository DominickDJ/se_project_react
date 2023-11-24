import React, { useContext, useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { editProfile } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function EditProfileModal({
  onSubmit,
  onClose,
  buttonText,
  isOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onSubmit(name, avatar)
      .then(() => {
        setIsLoading(false);
        onClose();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
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
    </div>
  );
}

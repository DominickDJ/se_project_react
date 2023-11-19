import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { editProfile } from "../../utils/auth";

export default function EditProfileModal({
  children,
  onClose,
  buttonText,
  user,
  isOpen,
  setActiveModal,
}) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenEditModal = () => {
    setActiveModal("EditProfileModal");
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    editProfile(name, avatar)
      .then(() => {
        setIsLoading(false);
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
        <div className="modal editProfileModal">
          <div className="modal__content">
            <button
              className="modal__close-button_add"
              type="button"
              onClick={onClose}
            ></button>
            <form className="modal__form">
              <h3 className="modal_title">Change Profile Data</h3>
              <label>
                Name*
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <label>
                Avatar
                <input
                  type="text"
                  value={avatar}
                  onChange={handleAvatarChange}
                />
              </label>
              {children}
              <button
                type="submit"
                className="modal__submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Save changes"}
              </button>
            </form>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
}

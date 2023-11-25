import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  onClose,
  onRegister,
  isOpen,
  buttonText,
  setActiveModal,
}) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const [isLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatar });
  };
  const handleOpenLoginModal = () => {
    setActiveModal("LoginModal");
  };
  return (
    <ModalWithForm
      buttonText={buttonText}
      title="Sign up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="modal__label-input">
        <label className="modal__label">
          <span>Email</span>
          <input
            className="modal__input"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal__label">
          <span>Password*</span>
          <input
            className="modal__input"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label className="modal__label">
          <span>Name</span>
          <input
            className="modal__input"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          <span>Avatar URL</span>
          <input
            className="modal__input"
            placeholder="Avatar URL"
            type="url"
            name="avatarUrl"
            value={avatar}
            onChange={handleAvatarUrlChange}
          />
        </label>
        <div>
          <button
            type="submit"
            className="modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <button
            className="redirect__submit-button"
            onClick={handleOpenLoginModal}
          >
            or Login
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

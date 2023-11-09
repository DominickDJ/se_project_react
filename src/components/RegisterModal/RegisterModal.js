import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import LoginModal from "../LoginModal/LoginModal";

const RegisterModal = ({
  handleCloseModal,
  onRegister,
  isOpen,
  buttonText,
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

  const [isLoading, setIsLoading] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onRegister({ email, password, name, avatar })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <ModalWithForm
      buttonText={buttonText}
      title="Sign up"
      onClose={handleCloseModal}
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
        {showLoginModal && (
          <LoginModal
            handleCloseModal={handleCloseLoginModal}
            handleOpenLoginModal={handleOpenLoginModal}
            buttonText="Log in"
          />
        )}
      </div>
      <button
        className="redirect__submit-button"
        onClick={handleOpenLoginModal}
      >
        or Login
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;

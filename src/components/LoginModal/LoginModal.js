import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./LoginModal.css";
import "../RegisterModal/RegisterModal.css";

const LoginModal = ({
  handleCloseModal,
  onLogin,
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

  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onLogin({ email, password })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div>
      <ModalWithForm
        buttonText={buttonText}
        title="Login"
        onClose={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleLogin}
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
              minLength="1"
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label className="modal__label">
            <span>Password</span>
            <input
              className="modal__input"
              placeholder="Password"
              type="password"
              name="password"
              minLength="1"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button
            className="redirect__submit-button"
            onClick={handleOpenRegisterModal}
          >
            or Register
          </button>
        </div>
      </ModalWithForm>

      {showRegisterModal && (
        <RegisterModal
          handleCloseModal={handleCloseRegisterModal}
          onRegister={onRegister}
          isOpen={showRegisterModal}
          buttonText="Register"
        />
      )}
    </div>
  );
};

export default LoginModal;

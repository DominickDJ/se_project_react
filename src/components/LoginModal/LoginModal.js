import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import "../RegisterModal/RegisterModal.css";

const LoginModal = ({
  onClose,
  onLogin,
  setActiveModal,
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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onLogin(email, password)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("RegisterModal");
  };

  return (
    <div>
      <ModalWithForm
        buttonText={buttonText}
        title="Login"
        onClose={onClose}
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
          <div>
            <button
              type="submit"
              className="modal__submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <button
              className="redirect__submit-button"
              onClick={handleOpenRegisterModal}
            >
              or Register
            </button>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;

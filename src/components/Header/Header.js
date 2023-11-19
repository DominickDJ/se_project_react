import React, { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Header.css";

const Header = ({ onCreateModal }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  const renderAvatar = () => {
    if (currentUser && currentUser.avatar) {
      return (
        <img
          className="header__avatar-logo"
          src={currentUser.avatar}
          alt="avatar"
        />
      );
    } else if (currentUser && currentUser.name) {
      const initials = currentUser.name.charAt(0).toUpperCase();
      return <div className="header__avatar-placeholder">{initials}</div>;
    } else {
      return (
        <img className="header__avatar-logo" src={avatarImage} alt="avatar" />
      );
    }
  };

  const renderHeaderContent = () => {
    if (currentUser && currentUser.name) {
      return (
        <>
          <ToggleSwitch />
          <div>
            <button
              className="header__button"
              type="text"
              onClick={() => {
                onCreateModal("create");
              }}
            >
              + Add Clothes
            </button>
          </div>
          <Link to="/profile">{currentUser.name}</Link>
          <div>{renderAvatar()}</div>
        </>
      );
    } else {
      return (
        <>
          <ToggleSwitch />
          <button
            className="header__button"
            type="text"
            onClick={() => {
              onCreateModal("RegisterModal");
            }}
          >
            Sign up
          </button>
          <button
            className="header__button"
            type="text"
            onClick={() => {
              onCreateModal("LoginModal");
            }}
          >
            Login
          </button>
        </>
      );
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo" />
          </Link>
        </div>
        <div>{currentDate}</div>
      </div>
      <div className="header__avatar-logo">{renderHeaderContent()}</div>
    </header>
  );
};

export default Header;

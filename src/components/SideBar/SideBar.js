import React, { useState, useContext } from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";
import "../Header/Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const SideBar = ({ onCreateModal, setIsLoggedIn }) => {
  const { currentUser, setCurrentUser, isLoggedIn } =
    useContext(CurrentUserContext);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

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
        <img className="header__avatar-logo" alt="avatar" src={avatarImage} />
      );
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <div> {renderAvatar()}</div>
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit"
          type="text"
          onClick={() => {
            onCreateModal("EditProfileModal");
          }}
        >
          Change profile data
        </button>
        <button type="text" className="sidebar__logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};
export default SideBar;

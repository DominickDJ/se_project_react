import React, { useState, useContext } from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
const SideBar = ({ setActiveModal, onCreateModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleOpenEditModal = () => {
    setActiveModal("EditProfileModal");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

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
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="header__avatar-logo" src={renderAvatar} alt="logo" />
        <p className="sidebar__username" src={currentUser}></p>
      </div>
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
  );
};
export default SideBar;

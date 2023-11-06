import React, { useState, useEffect } from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = ({ isOpen, onClick, onClose }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const [closeEditModal, setCloseEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setCloseEditModal(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatarImage} alt="logo" />
        <p className="sidebar__username">Dominick Harper</p>
      </div>
      <div
        className="sidebar__edit"
        value={openEditModal}
        onClose={handleCloseEditModal}
        onClick={handleOpenEditModal}
      >
        Change profile data
      </div>
      <div className="sidebar__logout" onClick={handleLogout}>
        Log out
      </div>
    </div>
  );
};
export default SideBar;

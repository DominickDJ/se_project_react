import React from "react";
import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" src={avatarImage} alt="logo" />
        <p className="sidebar__username">Dominick Harper</p>
      </div>
    </div>
  );
};

export default SideBar;

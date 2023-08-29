import React from "react";
import "./SideBar.css";

const SideBar = ({ user }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img className="sidebar__avatar" alt="Avatar" />
        <h2 className="sidebar__username">{user.username}</h2>
      </div>
    </div>
  );
};

export default SideBar;

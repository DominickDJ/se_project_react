import React from "react";
import "./SideBar.css";

const SideBar = ({}) => {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={require("../../images/avatar.svg").default}
          alt="logo"
        />
        <p className="sidebar__username">Dominick Harper</p>
      </div>
    </div>
  );
};

export default SideBar;

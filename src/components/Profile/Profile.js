import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

const Profile = () => {
  const user = {
    username: "User Name",
    avatar: "../../images/avatar.svg",
  };

  return (
    <div className="profile">
      <SideBar user={user} />
    </div>
  );
};

export default Profile;

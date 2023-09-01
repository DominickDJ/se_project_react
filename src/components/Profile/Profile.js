import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
const Profile = ({ onCreateModal }) => {
  const user = {
    username: "User Name",
    avatar: "../../images/avatar.svg",
  };

  return (
    <div className="profile">
      <SideBar user={user} />
      <ClothesSection onCreateModal={onCreateModal} />
    </div>
  );
};

export default Profile;

import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import ClothingList from "../ClothingList/ClothingList";
const Profile = ({
  onCreateModal,
  weatherTemp,
  onSelectedCard,
  clothingItems,
}) => {
  const user = {
    username: "User Name",
    avatar: "../../images/avatar.svg",
  };

  return (
    <div className="profile">
      <SideBar user={user} />
      <ClothesSection onCreateModal={onCreateModal} />
      {/* <ClothingList
        weatherTemp={weatherTemp}
        onSelectedCard={onSelectedCard}
        clothingItems={clothingItems}
      /> */}
    </div>
  );
};

export default Profile;

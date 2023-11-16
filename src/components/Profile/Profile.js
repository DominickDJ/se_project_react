import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  onCreateModal,
  clothingItems,
  weatherTemp,
  onSelectedCard,
}) => {
  const user = {
    username: "User Name",
    avatar: "../../images/avatar.svg",
  };
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <div className="profile">
      <SideBar
        user={user}
        onOpenEditModal={handleOpenEditModal}
        onCloseEditModal={handleCloseEditModal}
      />
      <ClothesSection
        onCreateModal={onCreateModal}
        clothingItems={clothingItems}
        weatherTemp={weatherTemp}
        onSelectedCard={onSelectedCard}
      />
    </div>
  );
};

export default Profile;

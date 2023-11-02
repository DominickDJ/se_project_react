import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ClothingList from "../ClothingList/ClothingList";

const ClothesSection = ({ onCreateModal, clothingItems, onSelectedCard }) => {
  const { currentUser } = useContext(CurrentUserContext);

  // Filter the clothing items to show only the ones added by the current user
  const userClothingItems = clothingItems.filter(
    (item) => item.owner._id === currentUser._id
  );

  return (
    <div className="clothes__section">
      <p className="clothes__section-title">Your Items</p>
      <div>
        <button
          className="clothes__section-button"
          type="text"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <ClothingList
        onSelectedCard={onSelectedCard}
        clothingItems={userClothingItems}
      />
    </div>
  );
};

export default ClothesSection;

import React from "react";
import "./ClothesSection.css";
import ClothingList from "../ClothingList/ClothingList";
const ClothesSection = ({ onCreateModal, clothingItems, onSelectedCard }) => {
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
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default ClothesSection;

import React from "react";
import "./ClothesSection.css";
const ClothesSection = ({ onCreateModal, clothingItems }) => {
  return (
    <div className="clothes__section">
      <p className="clothes__section-title">Your Items</p>
      <div>
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add New
        </button>
      </div>
    </div>
  );
};

export default ClothesSection;

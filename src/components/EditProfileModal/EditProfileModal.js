import React, { useState } from "react";
import "./ModalWithForm.css";

export default function EditProfileModal({
  children,
  onClose,
  onSubmit,
  isLoading,
  user,
}) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          avatar: avatar,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile data");
      }
      const data = await response.json();
      onSubmit({ name, avatar });
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal editProfileModal">
      <div className="modal__content">
        <button
          className="modal__close-button_add"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <h3 className="modal_title">Change Profile Data</h3>
          <label>
            Name*
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <label>
            Avatar
            <input type="text" value={avatar} onChange={handleAvatarChange} />
          </label>
          {children}
          <button
            type="submit"
            className="modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

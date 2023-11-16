import React from "react";

import "./ModalWithForm.css";
import "../RegisterModal/RegisterModal.css";
export default function ModalWithForm({
  children,
  title,
  onClose,
  name,
  onSubmit,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button_add"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          <h3 className="modal_title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
  );
}

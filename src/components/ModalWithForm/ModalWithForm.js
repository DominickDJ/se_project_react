import React, { useRef } from "react";

import "./ModalWithForm.css";
import "../RegisterModal/RegisterModal.css";

export default function ModalWithForm({
  children,
  title,
  onClose,
  name,
  onSubmit,
}) {
  const ref = useRef();

  const handleClickClose = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div onClick={handleClickClose} className={`modal modal_type_${name}`}>
      <div className="modal__content" ref={ref}>
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

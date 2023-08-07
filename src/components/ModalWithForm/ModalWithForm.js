import "./ModalWithForm.css";
export default function ModalWithForm({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form">
          <h3 className="modal_title">{title}</h3>
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

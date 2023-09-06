import "./ModalWithForm.css";

export default function ModalWithForm({
  children,
  title,
  buttonText,
  onClose,
  name,
  onSubmit,
  isLoading,
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
          <button
            type="submit"
            className="modal__submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

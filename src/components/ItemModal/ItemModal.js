import "./ItemModal.css";
const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content modal__content-image">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt="modalImage"
        />
        <div className="modal__description">{selectedCard.name}</div>
        <div className="modal__description"> {selectedCard.weather}</div>
      </div>
    </div>
  );
};
export default ItemModal;

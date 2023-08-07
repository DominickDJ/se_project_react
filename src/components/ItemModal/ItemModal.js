const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img className=".modal__image" src={selectedCard.link} />
        <div className="modal__description">{selectedCard.name}</div>
        <div>{selectedCard.weather}</div>
      </div>
    </div>
  );
};
export default ItemModal;

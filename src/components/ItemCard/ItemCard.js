const ItemCard = ({ item, onSelectedCard }) => {
  return (
    <div>
      <div>
        <img
          className="card__image"
          onClick={() => onSelectedCard(item)}
          src={item.link}
        />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};
export default ItemCard;

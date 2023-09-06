const ItemCard = ({ item, onSelectedCard }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };
  return (
    <div>
      <div>
        <img
          alt="card"
          className="card__image"
          onClick={handleCardClick}
          src={item.imageUrl}
        />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;

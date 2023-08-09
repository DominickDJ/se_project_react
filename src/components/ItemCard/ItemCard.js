const ItemCard = ({ item, onSelectedCard }) => {
  const handleCardClick = () => {
    onSelectedCard(item);
  };

  return (
    <div>
      <div>
        <img
          className="card__image"
          onClick={handleCardClick}
          src={item.link}
          alt="Card-Image"
        />
      </div>
      <div className="card__name">{item.name}</div>
    </div>
  );
};

export default ItemCard;

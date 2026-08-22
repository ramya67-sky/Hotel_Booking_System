function HotelCard({
  image,
  name,
  description,
  price,
  onOpen,
  onEdit,
  onDelete
}) {
  return (
    <article
      className="hotel-card"
      onClick={onOpen}
    >
      <img
        src={image}
        alt={name}
        className="hotel-card-image"
      />

      <div className="hotel-card-content">
        <h2>{name}</h2>

        <p className="hotel-price">
          ₹{price}/night
        </p>

        <p className="hotel-description">
          {description}
        </p>

        <div className="hotel-card-actions">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;

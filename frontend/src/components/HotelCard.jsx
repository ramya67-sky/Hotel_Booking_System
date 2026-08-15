function HotelCard({
  image,
  name,
  description,
  price,
  onEdit,
  onDelete
}) {
  return (
    <article className="hotel-card">
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
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default HotelCard;


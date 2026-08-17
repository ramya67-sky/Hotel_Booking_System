function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">

      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ←
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((number) => (
        <button
          key={number}
          type="button"
          className={page === number ? "active-page" : ""}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        →
      </button>

    </div>
  );
}

export default Pagination;
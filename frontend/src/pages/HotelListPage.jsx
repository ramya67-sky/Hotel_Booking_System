import { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "../components/HotelCard";
import SearchPanel from "../components/SearchPanel";

function HotelListPage({ onEditHotel, refreshHotels  }) {
  const [hasSearched, setHasSearched] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState("");

  useEffect(() => {
  async function fetchHotels() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5001/api/hotels"
      );

      setHotels(response.data);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  }

  fetchHotels();
}, [refreshHotels]);

  async function handleSearch(searchData) {
    try {
      const params = {
        limit: 3,
        offset: (page - 1) * 3
      };

      if (searchData.search) {
        params.search = searchData.search;
      }

      if (searchData.minPrice) {
        params.minPrice = searchData.minPrice;
      }

      if (searchData.maxPrice) {
        params.maxPrice = searchData.maxPrice;
      }

      const response = await axios.get(
        "http://127.0.0.1:5001/api/hotels",
        {
          params: params
        }
      );

      setHotels(response.data);
      setHasSearched(true);

      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  }

  async function handlePageChange(newPage) {
    if (newPage < 1 || newPage > 3) {
      return;
    }

    setPage(newPage);

    try {
      const response = await axios.get(
        "http://127.0.0.1:5001/api/hotels",
        {
          params: {
            limit: 3,
            offset: (newPage - 1) * 3
          }
        }
      );

      setHotels(response.data);
    } catch (error) {
      console.error("Failed to change page:", error);
    }
  }

  function handleEditHotel(hotel) {
    onEditHotel(hotel);
  }

  async function handleDeleteHotel(id) {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this hotel?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:5001/api/hotels/${id}`
      );

      setHotels((currentHotels) =>
        currentHotels.filter((hotel) => hotel.id !== id)
      );

      setSuccess("✅ Hotel deleted successfully!");
    } catch (error) {
      console.error("Delete hotel error:", error);
      setSuccess("Failed to delete hotel");
    }
  }

  return (
    <main className="hotel-page">

      <section className="hero-section">
        <h2>Find your next stay</h2>

        <p>
          Discover comfortable places to stay and choose
          what works best for you.
        </p>
      </section>

      <SearchPanel onSearch={handleSearch} />

      {success && (
        <p className="form-success">
          {success}
        </p>
      )}

      {hasSearched && (
        <section className="hotel-section">

          <div className="section-heading">
            <h2>{hotels.length} Hotels Found</h2>

            <p>
              Explore available stays.
            </p>
          </div>

          {hotels.length === 0 ? (
            <div className="empty-state">
              <h3>No hotels found</h3>

              <p>
                Try changing your search or price range.
              </p>
            </div>
          ) : (
            <div className="hotel-list">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  image={`http://127.0.0.1:5001${hotel.image}`}
                  name={hotel.title}
                  description={hotel.description}
                  price={hotel.price}
                  onEdit={() => handleEditHotel(hotel)}
                  onDelete={() => handleDeleteHotel(hotel.id)}
                />
              ))}
            </div>
          )}

          <div className="pagination">

            <button
              type="button"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              ←
            </button>

            <button
              type="button"
              className={page === 1 ? "active-page" : ""}
              onClick={() => handlePageChange(1)}
            >
              1
            </button>

            <button
              type="button"
              className={page === 2 ? "active-page" : ""}
              onClick={() => handlePageChange(2)}
            >
              2
            </button>

            <button
              type="button"
              className={page === 3 ? "active-page" : ""}
              onClick={() => handlePageChange(3)}
            >
              3
            </button>

            <button
              type="button"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === 3}
            >
              →
            </button>

          </div>

        </section>
      )}

    </main>
  );
}

export default HotelListPage;
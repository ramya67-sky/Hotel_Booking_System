
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setHotels, removeHotel } from "../store/HotelSlice";
import HotelCard from "../components/HotelCard";
import SearchPanel from "../components/SearchPanel";
import Pagination from "../components/Pagination";

const emptySearch = {
  search: "",
  minPrice: "",
  maxPrice: ""
};

function HotelListPage({ onEditHotel, refreshHotels }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hotels = useSelector((state) => state.hotels.hotels);
  const total = useSelector((state) => state.hotels.total);

  const saved = JSON.parse(
    sessionStorage.getItem("hotelListState") || "null"
  );

  const [page, setPage] = useState(saved?.page || 1);
  const [searchData, setSearchData] = useState(
    saved?.searchData || emptySearch
  );
  const [hasSearched, setHasSearched] = useState(
    saved?.hasSearched || false
  );
  const [success, setSuccess] = useState("");

  const limit = 3;
  const totalPages = Math.ceil(total / limit);

  function saveListState(data, currentPage, searched = true) {
    sessionStorage.setItem(
      "hotelListState",
      JSON.stringify({
        searchData: data,
        page: currentPage,
        hasSearched: searched
      })
    );
  }

  async function loadHotels(data, currentPage) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5001/api/hotels",
        {
          params: {
            search: data.search,
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            limit,
            offset: (currentPage - 1) * limit
          }
        }
      );

      dispatch(setHotels(response.data));
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  }

  useEffect(() => {
    if (hasSearched) {
      loadHotels(searchData, page);
    }
  }, [refreshHotels]);

  async function handleSearch(data) {
    setSearchData(data);
    setPage(1);
    setHasSearched(true);

    saveListState(data, 1);

    await loadHotels(data, 1);
  }

  async function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
    saveListState(searchData, newPage);

    await loadHotels(searchData, newPage);
  }

  function handleHotelClick(id) {
    saveListState(searchData, page, hasSearched);
    navigate(`/hotels/${id}`);
  }

  function handleEdit(hotel) {
    onEditHotel(hotel);
  }

  async function handleDelete(id) {
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

      dispatch(removeHotel(id));
      setSuccess("✅ Hotel deleted successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (error) {
      console.error("Delete hotel error:", error);
      setSuccess("Failed to delete hotel");
    }
  }

  return (
    <main className="hotel-page">

      <section className="hero-section"></section>

      <SearchPanel
        onSearch={handleSearch}
        initialFilters={searchData}
      />

      {success && (
        <div className="delete-popup">
          {success}
        </div>
      )}

      {hasSearched && (
        <section className="hotel-section">

          <div className="section-heading">
            <h2>{total} Hotels Found</h2>
            <p>Explore available stays.</p>
          </div>

          {hotels.length === 0 ? (
            <div className="empty-state">
              <h3>No hotels found</h3>
              <p>Try changing your search or price range.</p>
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
                  onOpen={() => handleHotelClick(hotel.id)}
                  onEdit={() => handleEdit(hotel)}
                  onDelete={() => handleDelete(hotel.id)}
                />
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

        </section>
      )}

    </main>
  );
}

export default HotelListPage;


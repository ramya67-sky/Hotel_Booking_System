import { useState } from "react";

function SearchPanel({ onSearch }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  

  function handleSearch(event) {
    event.preventDefault();

    const searchData = {
      search,
      minPrice,
      maxPrice,
      checkIn,
      checkOut,
      adults,
      children
    };

    console.log("Search data:", searchData);

    onSearch(searchData);
  }

  return (
    <form className="search-panel" onSubmit={handleSearch}>

      <div className="search-main">
        <label htmlFor="search">Search</label>

        <input
          id="search"
          type="text"
          placeholder="Search hotel or destination"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="search-grid">

        <div className="search-field">
          <label htmlFor="checkIn">Check-in</label>

          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="checkOut">Check-out</label>

          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="adults">Adults</label>

          <input
            id="adults"
            type="number"
            min="1"
            value={adults}
            onChange={(event) =>
              setAdults(Number(event.target.value))
            }
          />
        </div>

        <div className="search-field">
          <label htmlFor="children">Children</label>

          <input
            id="children"
            type="number"
            min="0"
            value={children}
            onChange={(event) =>
              setChildren(Number(event.target.value))
            }
          />
        </div>

        <div className="search-field">
          <label htmlFor="minPrice">Min price</label>

          <input
            id="minPrice"
            type="number"
            min="0"
            placeholder="$50"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="maxPrice">Max price</label>

          <input
            id="maxPrice"
            type="number"
            min="0"
            placeholder="$500"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </div>

      </div>

      <button type="submit" className="search-button">
        Search Hotels
      </button>

    </form>
  );
}

export default SearchPanel;
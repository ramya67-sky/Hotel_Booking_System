import { useEffect, useState } from "react";

function SearchPanel({ onSearch, initialFilters }) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    if (!initialFilters) return;

    setSearch(initialFilters.search || "");
    setMinPrice(initialFilters.minPrice || "");
    setMaxPrice(initialFilters.maxPrice || "");
  }, [initialFilters]);

  function handleSearch(event) {
    event.preventDefault();

    onSearch({ search, minPrice, maxPrice });
  }

  return (
    <form className = "search-panel" onSubmit = {handleSearch}>

      <div className = "search-field search-field-title">
        <label htmlFor = "search">Search by title</label>
        <input
          id = "search"
          type = "text"
          placeholder = "Search hotel by name"
          value = {search}
          onChange = {(event) => setSearch(event.target.value)}
        />
      </div>

      <div className = "search-grid">

        <div className = "search-field">
          <label htmlFor = "minPrice">Min price</label>
          <input
            id = "minPrice"
            type = "number"
            min = "0"
            placeholder = "₹500"
            value = {minPrice}
            onChange = {(event) => setMinPrice(event.target.value)}
          />
        </div>

        <div className = "search-field">
          <label htmlFor = "maxPrice">Max price</label>
          <input
            id = "maxPrice"
            type = "number"
            min = "0"
            placeholder = "₹5000"
            value = {maxPrice}
            onChange = {(event) => setMaxPrice(event.target.value)}
          />
        </div>

      </div>

      <button type = "submit" className = "search-button">
        Search Hotels
      </button>

    </form>
  );
}

export default SearchPanel;

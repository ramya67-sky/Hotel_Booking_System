import { useState } from "react";
import HotelForm from "./components/HotelForm";
import HotelListPage from "./pages/HotelListPage";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [refreshHotels, setRefreshHotels] = useState(0);

  function handleAddHotel() {
    setEditingHotel(null);
    setShowForm(true);
  }

  function handleEditHotel(hotel) {
    setEditingHotel(hotel);
    setShowForm(true);
  }

  function handleHotelSaved() {
    setShowForm(false);
    setEditingHotel(null);
    setRefreshHotels((value) => value + 1);
  }

  return (
    <div className="app-container">

      <header className="app-header">
        <div className="brand">
          <h1>🌌 Zonova</h1>
          <p>Simple stays, better choices.</p>
        </div>

        <button
          className="add-hotel-button"
          onClick={handleAddHotel}
        >
          + Add Hotel
        </button>
      </header>

      {showForm && (
        <HotelForm
          editingHotel={editingHotel}
          onHotelSaved={handleHotelSaved}
        />
      )}

      <HotelListPage
        onEditHotel={handleEditHotel}
        refreshHotels={refreshHotels}
      />

    </div>
  );
}

export default App;
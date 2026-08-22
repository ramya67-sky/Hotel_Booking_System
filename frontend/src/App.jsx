import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";

import HotelForm from "./components/HotelForm";
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [refreshHotels, setRefreshHotels] = useState(0);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];

    if (navigation?.type === "reload") {
      sessionStorage.removeItem("hotelListState");
    }
  }, []);

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
    <HelmetProvider>
      <BrowserRouter>
        <div className="app-container">

<header className="app-header">
  <div className="brand">
    <h1> 🏨Zonova</h1>
    <h4>Manage Your Hotels with Ease.</h4>
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

          <Routes>
            <Route
              path="/"
              element={
                <HotelListPage
                  onEditHotel={handleEditHotel}
                  refreshHotels={refreshHotels}
                />
              }
            />

            <Route
              path="/hotels/:id"
              element={<HotelDetailPage />}
            />
          </Routes>

        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
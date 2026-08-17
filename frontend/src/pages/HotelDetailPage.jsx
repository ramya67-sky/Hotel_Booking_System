import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function HotelDetailPage() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5001/api/hotels/${id}`)
      .then((response) => setHotel(response.data))
      .catch((error) => console.error("Hotel fetch error:", error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude
          ]);
        },
        () => console.log("Location permission not granted")
      );
    }
  }, [id]);

  if (!hotel) return <p>Loading hotel...</p>;

  const location = [
    Number(hotel.latitude),
    Number(hotel.longitude)
  ];

  return (
    <main className="hotel-detail">

    <Helmet>
  <title>
    {hotel?.title
      ? `${hotel.title} | Zonova`
      : "Zonova"}
  </title>

  <meta
    name="description"
    content={hotel?.description || "Find your next stay with Zonova."}
  />
   </Helmet>


      <img
        src={`http://127.0.0.1:5001${hotel.image}`}
        alt={hotel.title}
        className="detail-image"
      />

      <h1>{hotel.title}</h1>
      <p>₹{hotel.price}/night</p>
      <p>{hotel.description}</p>

      <p>Latitude: {hotel.latitude}</p>
      <p>Longitude: {hotel.longitude}</p>

      <div className="hotel-map">
        <MapContainer
          center={location}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <CircleMarker center={location}>
            <Popup>{hotel.title}</Popup>
          </CircleMarker>

          {userLocation && (
            <CircleMarker center={userLocation} pathOptions={{ color: "blue" }}>
              <Popup>Your current location</Popup>
            </CircleMarker>
          )}
        </MapContainer>
      </div>

    </main>
  );
}

export default HotelDetailPage;
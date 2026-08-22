import { useEffect, useState } from "react";
import axios from "axios";

function HotelForm({ editingHotel, onHotelSaved }) {
  const isEditing = Boolean(editingHotel);

  const emptyForm = {
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: null
  };

  const [formData, setFormData] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editingHotel) {
      setFormData({
        title: editingHotel.title,
        description: editingHotel.description,
        latitude: editingHotel.latitude,
        longitude: editingHotel.longitude,
        price: editingHotel.price,
        image: null
      });
      setExistingImage(editingHotel.image);
    } else {
      setFormData(emptyForm);
      setExistingImage("");
    }

    setImagePreview("");
    setError("");
    setSuccess("");
  }, [editingHotel]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.latitude ||
      !formData.longitude ||
      Number(formData.price) <= 0
    ) {
      setError("Please fill all fields correctly");
      return;
    }

    if (!isEditing && !formData.image) {
      setError("Hotel image is required");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const url = isEditing
        ? `http://127.0.0.1:5001/api/hotels/${editingHotel.id}`
        : "http://127.0.0.1:5001/api/hotels";

      const response = isEditing
        ? await axios.put(url, data)
        : await axios.post(url, data);

      console.log("Hotel response:", response.data);

      setSuccess(
        isEditing
          ? "✅ Hotel updated successfully!"
          : "✅ Hotel saved successfully!"
      );

      setFormData(emptyForm);
      setImagePreview("");
      setExistingImage("");

      setTimeout(() => {
        onHotelSaved?.();
      }, 500);
    } catch (error) {
      console.error("Hotel save error:", error);
      setError(
        isEditing
          ? "Failed to update hotel"
          : "Failed to save hotel"
      );
    }
  }

  return (
    <form onSubmit = {handleSubmit} className = "hotel-form">
      <h2>{isEditing ? "Edit Hotel" : "Add Hotel"}</h2>

      {success && <p className = "form-success">{success}</p>}
      {error && <p className = "form-error">{error}</p>}

      <div className = "form-group">
        <label>Hotel Title</label>
        <input
          name = "title"
          value = {formData.title}
          onChange = {handleChange}
        />
      </div>

      <div className = "form-group">
        <label>Description</label>
        <textarea
          name = "description"
          value = {formData.description}
          onChange = {handleChange}
        />
      </div>

      <div className = "form-row">
        <div className = "form-group">
          <label>Latitude</label>
          <input
            name = "latitude"
            type = "number"
            step = "any"
            value = {formData.latitude}
            onChange = {handleChange}
          />
        </div>

        <div className = "form-group">
          <label>Longitude</label>
          <input
            name = "longitude"
            type = "number"
            step = "any"
            value = {formData.longitude}
            onChange = {handleChange}
          />
        </div>
      </div>

      <div className = "form-group">
        <label>Price</label>
        <input
          name = "price"
          type = "number"
          min = "0"
          step = "any"
          value = {formData.price}
          onChange = {handleChange}
        />
      </div>

      <div className = "form-group">
        <label>Hotel Image</label>
        <input
          name = "image"
          type = "file"
          accept = "image/*"
          onChange = {handleImageChange}
        />
      </div>

      {isEditing && existingImage && !imagePreview && (
        <div className = "image-preview">
          <p>Current Image:</p>
          <img
            src = {`http://127.0.0.1:5001${existingImage}`}
            alt = "Current hotel"
          />
        </div>
      )}

      {imagePreview && (
        <div className = "image-preview">
          <p>New Image:</p>
          <img src = {imagePreview} alt = "Preview" />
        </div>
      )}

      <button type = "submit" className = "save-button">
        {isEditing ? "Update Hotel" : "Save Hotel"}
      </button>
    </form>
  );
}

export default HotelForm;

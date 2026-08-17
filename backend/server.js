
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const upload = multer({
  dest: "uploads/"
});

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Hotel Management API is running"
  });
});

// GET HOTELS
app.get("/api/hotels", async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      limit = 3,
      offset = 0
    } = req.query;

    let query = "SELECT * FROM hotels WHERE 1=1";
    let countQuery = "SELECT COUNT(*) FROM hotels WHERE 1=1";

    const values = [];
    const countValues = [];

    if (search) {
      values.push(`%${search}%`);
      countValues.push(`%${search}%`);

      query += ` AND title ILIKE $${values.length}`;
      countQuery += ` AND title ILIKE $${countValues.length}`;
    }

    if (minPrice) {
      values.push(Number(minPrice));
      countValues.push(Number(minPrice));

      query += ` AND price >= $${values.length}`;
      countQuery += ` AND price >= $${countValues.length}`;
    }

    if (maxPrice) {
      values.push(Number(maxPrice));
      countValues.push(Number(maxPrice));

      query += ` AND price <= $${values.length}`;
      countQuery += ` AND price <= $${countValues.length}`;
    }

    query += " ORDER BY id DESC";

    values.push(Number(limit));
    query += ` LIMIT $${values.length}`;

    values.push(Number(offset));
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);
    const countResult = await pool.query(countQuery, countValues);

    res.json({
      hotels: result.rows,
      total: Number(countResult.rows[0].count)
    });

  } catch (error) {
    console.error("Get hotels error:", error);

    res.status(500).json({
      message: "Failed to fetch hotels"
    });
  }
});

app.get("/api/hotels/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get hotel error:", error);

    res.status(500).json({
      message: "Failed to fetch hotel"
    });
  }
});

// POST HOTEL
app.post("/api/hotels", upload.single("image"), async (req, res) => {
  try {
    const {
      title,
      description,
      latitude,
      longitude,
      price
    } = req.body;

    if (!title || !description || !latitude || !longitude || !price) {
      return res.status(400).json({
        message: "All hotel fields are required"
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Hotel price must be greater than 0"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Hotel image is required"
      });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const result = await pool.query(
      `INSERT INTO hotels
       (image, title, description, latitude, longitude, price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        imagePath,
        title,
        description,
        latitude,
        longitude,
        price
      ]
    );

    res.status(201).json({
      message: "Hotel created successfully",
      hotel: result.rows[0]
    });
  } catch (error) {
    console.error("Create hotel error:", error);

    res.status(500).json({
      message: "Failed to create hotel"
    });
  }
});

// UPDATE HOTEL
app.put("/api/hotels/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      latitude,
      longitude,
      price
    } = req.body;

    if (!title || !description || !latitude || !longitude || !price) {
      return res.status(400).json({
        message: "All hotel fields are required"
      });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({
        message: "Hotel price must be greater than 0"
      });
    }

    // Get existing hotel
    const existingHotel = await pool.query(
      "SELECT * FROM hotels WHERE id = $1",
      [id]
    );

    if (existingHotel.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    const oldHotel = existingHotel.rows[0];

    let imagePath = oldHotel.image;

    // If a new image was uploaded, use the new image
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const result = await pool.query(
      `UPDATE hotels
       SET image = $1,
           title = $2,
           description = $3,
           latitude = $4,
           longitude = $5,
           price = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [
        imagePath,
        title,
        description,
        latitude,
        longitude,
        price,
        id
      ]
    );

    // Delete old image if a new image replaced it
    if (req.file && oldHotel.image) {
      const oldImagePath = `.${oldHotel.image}`;

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.json({
      message: "Hotel updated successfully",
      hotel: result.rows[0]
    });

  } catch (error) {
    console.error("Update hotel error:", error);

    res.status(500).json({
      message: "Failed to update hotel"
    });
  }
});

// DELETE HOTEL
app.delete("/api/hotels/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM hotels WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Hotel not found"
      });
    }

    const hotel = result.rows[0];

    // Delete the image file from uploads/
    if (hotel.image) {
      const imagePath = `.${hotel.image}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({
      message: "Hotel deleted successfully",
      hotel
    });
  } catch (error) {
    console.error("Delete hotel error:", error);

    res.status(500).json({
      message: "Failed to delete hotel"
    });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});


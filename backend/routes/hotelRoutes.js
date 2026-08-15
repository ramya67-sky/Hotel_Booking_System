const express = require("express");
const multer = require("multer");
const pool = require("../db");

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log("NEW POST /api/hotels ROUTE HIT");
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
router.get("/", async (req, res) => {
  console.log("GET /api/hotels ROUTE HIT");

  try {
    const result = await pool.query(
      "SELECT * FROM hotels ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get hotels error:", error);

    res.status(500).json({
      message: "Failed to fetch hotels"
    });
  }
});

module.exports = router;
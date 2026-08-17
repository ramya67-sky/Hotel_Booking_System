# 🌌 Zonova – Hotel Management System

A full-stack Hotel Management application built with **ReactJS, Redux Toolkit, Node.js, Express, and PostgreSQL**.

Zonova provides a responsive hotel listing interface with CRUD operations, search and price filters, pagination, image uploads, hotel details, map-based location display, and SEO optimization.

## ✨ Features

### Hotel Management

* Add new hotels with validation
* Edit existing hotel details using the same reusable form
* Permanently delete hotels with confirmation
* Delete associated uploaded images from the server
* Image upload with preview
* Success messages and delete confirmation popup

### Hotel Listing

* Card-based hotel list
* Search hotels by title
* Filter hotels by minimum and maximum price
* Dynamic pagination using `limit` and `offset`
* Pagination automatically adjusts based on total matching hotels
* Responsive layout for different screen sizes

### Hotel Details

* Dedicated hotel detail page
* Full hotel information
* Hotel image and description
* Latitude and longitude
* Interactive map using Leaflet
* Browser Geolocation API for current location
* Navigation using React Router

### SEO & Accessibility

* Dynamic page titles using React Helmet
* Dynamic meta descriptions
* `alt` attributes for hotel images
* Single Page Application architecture

## 🛠️ Technology Stack

### Frontend

* ReactJS
* Redux Toolkit
* React Redux
* React Router DOM
* Axios
* React Helmet Async
* React Leaflet
* Leaflet
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Multer
* CORS
* dotenv

### Database

* PostgreSQL
* Native SQL queries
* No ORM

## 📁 Project Structure

```text
Hotel_Management/
│
├── frontend/
│   ├── public/
│   │   └── zonova-bg.png
│   │
│   └── src/
│       ├── components/
│       │   ├── HotelCard.jsx
│       │   ├── HotelForm.jsx
│       │   ├── Pagination.jsx
│       │   └── SearchPanel.jsx
│       │
│       ├── pages/
│       │   ├── HotelListPage.jsx
│       │   └── HotelDetailPage.jsx
│       │
│       ├── store/
│       │   ├── store.js
│       │   └── hotelSlice.js
│       │
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── backend/
│   ├── uploads/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🔄 Application Flow

```text
React Frontend
      │
      │ Axios
      ▼
Express REST API
      │
      │ Native SQL
      ▼
PostgreSQL
```

For hotel images:

```text
React Form
    ↓
Multer
    ↓
backend/uploads/
    ↓
Image path stored in PostgreSQL
```

## 🔌 API Endpoints

### Get Hotels

```http
GET /api/hotels
```

Supports:

```text
search
minPrice
maxPrice
limit
offset
```

Example:

```http
GET /api/hotels?minPrice=200&maxPrice=500&limit=3&offset=0
```

Response contains:

```json
{
  "hotels": [],
  "total": 0
}
```

### Get Single Hotel

```http
GET /api/hotels/:id
```

Example:

```http
GET /api/hotels/7
```

### Create Hotel

```http
POST /api/hotels
```

Uses `multipart/form-data` for image upload and hotel fields.

### Update Hotel

```http
PUT /api/hotels/:id
```

Supports updating hotel details and replacing the image when a new image is uploaded.

### Delete Hotel

```http
DELETE /api/hotels/:id
```

Deletes the hotel record and its associated uploaded image file.

## 🗄️ Database

The application uses **PostgreSQL** with native SQL queries.

Example hotel fields:

```text
id
image
title
description
latitude
longitude
price
created_at
updated_at
```

No ORM is used.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd Hotel_Management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Start the backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5001
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🧭 Main Routes

```text
/             → Hotel List Page
/hotels/:id   → Hotel Detail Page
```

## 🧩 Reusable Components

The project follows a component-based structure:

```text
HotelForm
→ Reused for Add and Edit

HotelCard
→ Reused for hotel list items

Pagination
→ Reusable pagination component

SearchPanel
→ Reusable search and filter section
```

## 📱 Responsive UI

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

The hotel list switches from multiple columns to a single-column layout on smaller screens.

## 🔐 Notes

* Uploaded images are stored locally on the Node.js server.
* PostgreSQL is used for persistent hotel data.
* The backend uses native SQL queries instead of an ORM.
* Geolocation requires browser permission.
* The application is designed as a Single Page Application using React Router.

## 👩‍💻 Author

**Ramya Ruba**

GitHub:
https://github.com/ramya67-sky

LinkedIn:
https://www.linkedin.com/in/ramya-ruba/

## 📌 Project Status

✅ Hotel CRUD

✅ Search & price filters

✅ Dynamic pagination

✅ Image upload

✅ Detail page
✅ Map & geolocation
✅ Redux Toolkit
✅ React Router SPA
✅ SEO metadata
✅ Responsive UI

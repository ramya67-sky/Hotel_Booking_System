# 🏨 Zonova – Hotel Management System

Zonova(Zone + Nova) is a full-stack Hotel Management System developed using ReactJS, Redux Toolkit, Node.js, Express.js, and PostgreSQL.

The application supports hotel CRUD operations, image upload, search, price filtering, pagination, hotel details, and map-based location display.

## Features

### Hotel Management

* Add a hotel with form validation
* Edit existing hotel details
* Delete hotels with confirmation
* Upload and preview hotel images
* Reuse the same form for Add and Edit

### Hotel Listing

* Display hotels as cards
* Search hotels by title
* Filter by minimum and maximum price
* Pagination using limit and offset
* Responsive layout

### Hotel Details

* View complete hotel information
* Display hotel image and description
* Show latitude and longitude
* Display hotel location using Leaflet map
* Get current location using browser Geolocation API
* Navigate using React Router

### Other

* Redux Toolkit for state management
* React Helmet for page title and meta description
* Responsive UI
* Image upload using Multer
* PostgreSQL database with native SQL queries

## Tech Stack

### Frontend

* ReactJS
* Redux Toolkit
* React Router DOM
* Axios
* React Helmet Async
* React Leaflet
* HTML & CSS

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

## Project Structure

```text
Hotel_Management/
│
├── frontend/
│   ├── public/
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

## Application Flow

```text
ReactJS
   ↓
Redux Toolkit
   ↓
Axios
   ↓
Express REST API
   ↓
PostgreSQL
```

For image upload:

```text
React Form
   ↓
Multer
   ↓
backend/uploads/
   ↓
Image path stored in PostgreSQL
```

## API Endpoints

| Method | Endpoint          | Purpose                                        |
| ------ | ----------------- | ---------------------------------------------- |
| GET    | `/api/hotels`     | Get hotels with search, filters and pagination |
| GET    | `/api/hotels/:id` | Get a single hotel                             |
| POST   | `/api/hotels`     | Add a new hotel                                |
| PUT    | `/api/hotels/:id` | Update a hotel                                 |
| DELETE | `/api/hotels/:id` | Delete a hotel                                 |

### Query Parameters

The hotel listing API supports:

```text
search
minPrice
maxPrice
limit
offset
```

Example:

```text
/api/hotels?minPrice=200&maxPrice=500&limit=3&offset=0
```

## Database

PostgreSQL is used to store hotel information.

Main fields include:

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

Native SQL queries are used instead of an ORM.

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
cd Hotel_Management
```

### 2. Backend

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

Backend:

```text
http://localhost:5001
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Routes

```text
/             → Hotel List
/hotels/:id   → Hotel Details
```

## Author

**Ramya Ruba**

GitHub: https://github.com/ramya67-sky


## Project Status

* [x] Hotel CRUD
* [x] Search and price filters
* [x] Pagination
* [x] Image upload
* [x] Hotel detail page
* [x] Leaflet map
* [x] Browser geolocation
* [x] Redux Toolkit
* [x] React Router
* [x] SEO metadata
* [x] Responsive UI

import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./HotelSlice";

const store = configureStore({
  reducer: {
    hotels: hotelReducer
  }
});

export default store;
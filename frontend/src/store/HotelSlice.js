import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotels",

  initialState: {
    hotels: [],
    total: 0
  },

  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload.hotels;
      state.total = action.payload.total;
    },

    removeHotel: (state, action) => {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );

      state.total = Math.max(0, state.total - 1);
    }
  }
});

export const {
  setHotels,
  removeHotel
} = hotelSlice.actions;

export default hotelSlice.reducer;
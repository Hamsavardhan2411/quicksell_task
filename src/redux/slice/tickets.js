import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    DefineTickets: (state, action) => {
      state.data = action.payload;
      console.log(action.payload)
    },
  },
});

export const { DefineTickets } = ticketSlice.actions;

export default ticketSlice.reducer;

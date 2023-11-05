import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const headerSlice = createSlice({
  name: "headers",
  initialState,
  reducers: {
    updateHeader: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateHeader } = headerSlice.actions;

export default headerSlice.reducer;

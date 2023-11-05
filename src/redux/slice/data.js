import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const contentSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateContent: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateContent } = contentSlice.actions;

export default contentSlice.reducer;

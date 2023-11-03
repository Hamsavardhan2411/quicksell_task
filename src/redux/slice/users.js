import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    DefineUsers: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { DefineUsers } = userSlice.actions;

export default userSlice.reducer;

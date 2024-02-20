import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "nav",
  initialState: {
    value: "board",
  },
  reducers: {
    changeNav: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeNav } = navSlice.actions;
export default navSlice.reducer;

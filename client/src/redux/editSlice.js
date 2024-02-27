import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
  name: "edit",
  initialState: {
    value: null,
  },
  reducers: {
    editTaskId: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { editTaskId } = editSlice.actions;
export default editSlice.reducer;

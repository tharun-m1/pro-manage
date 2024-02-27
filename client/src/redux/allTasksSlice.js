import { createSlice } from "@reduxjs/toolkit";

export const allTasksSlice = createSlice({
  name: "allTasks",
  initialState: {
    value: {
      todo: [],
      backlog: [],
      progress: [],
      done: [],
    },
  },
  reducers: {
    setTasks: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setTasks, updateItemStatus } = allTasksSlice.actions;
export default allTasksSlice.reducer;

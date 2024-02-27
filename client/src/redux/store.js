import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice";
import allTaskReducer from "./allTasksSlice";
import editSliceReducer from "./editSlice";
import filterSliceReducer from "./filterSlice";
export const store = configureStore({
  reducer: {
    nav: navReducer,
    allTasks: allTaskReducer,
    edit: editSliceReducer,
    filter: filterSliceReducer,
  },
});

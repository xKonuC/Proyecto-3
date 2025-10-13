import { createSlice } from "@reduxjs/toolkit";

const studentHasTitleSlice = createSlice({
  name: "studentHasTitle",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      titleID: null,
      titleYear: "",
    },
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setNewItem: (state, action) => {
      state.newItem = { ...state.newItem, ...action.payload };
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    clearFilteredItems: (state) => {
      state.filteredItems = null;
    },
    clearNewItem: (state) => {
      state.newItem = {
        titleID: null,
        titleYear: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = studentHasTitleSlice.actions;
export default studentHasTitleSlice.reducer;

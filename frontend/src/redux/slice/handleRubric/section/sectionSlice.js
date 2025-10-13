import { createSlice } from "@reduxjs/toolkit";

const sectionSlice = createSlice({
  name: "section",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      name: "",
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
        name: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = sectionSlice.actions;
export default sectionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      archiveURL: "",
      category: "",
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
        archiveURL: "",
        category: "",
      };
    },
  },
});

export const { setItems, setNewItem, setFilteredItems, clearFilteredItems, clearNewItem } = documentSlice.actions;
export default documentSlice.reducer;

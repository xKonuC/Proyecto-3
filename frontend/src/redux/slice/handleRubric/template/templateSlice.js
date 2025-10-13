import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      name: "",
      description: "",
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
        description: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = templateSlice.actions;
export default templateSlice.reducer;

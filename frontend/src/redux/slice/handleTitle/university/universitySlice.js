import { createSlice } from "@reduxjs/toolkit";

const universitySlice = createSlice({
  name: "university",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      name: "",
      city: "",
      country: "",
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
        city: "",
        country: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = universitySlice.actions;
export default universitySlice.reducer;

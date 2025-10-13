import { createSlice } from "@reduxjs/toolkit";

const titleSlice = createSlice({
  name: "title",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      name: "",
      degreeID: null,
      universityID: null,
      areaID: null,
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
        degreeID: null,
        universityID: null,
        areaID: null,
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = titleSlice.actions;
export default titleSlice.reducer;

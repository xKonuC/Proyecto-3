import { createSlice } from "@reduxjs/toolkit";

const publicationSlice = createSlice({
  name: "publication",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      authors: "",
      leadAuthor: "",
      type: "",
      year: "",
      isIndexed: "",
      title: "",
      journal: "",
      ISSN: "",
      status: "",
      accessURL: "",
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
        authors: "",
        leadAuthor: "",
        type: "",
        year: "",
        isIndexed: "",
        title: "",
        journal: "",
        ISSN: "",
        status: "",
        accessURL: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = publicationSlice.actions;
export default publicationSlice.reducer;

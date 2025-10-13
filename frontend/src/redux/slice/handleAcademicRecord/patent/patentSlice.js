import { createSlice } from "@reduxjs/toolkit";

const patentSlice = createSlice({
  name: "patent",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      inventors: "",
      patentName: "",
      applicationDate: null,
      publicationDate: null,
      registrationNumber: "",
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
        inventors: "",
        patentName: "",
        applicationDate: null,
        publicationDate: null,
        registrationNumber: "",
        status: "",
        accessURL: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = patentSlice.actions;
export default patentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const consultancySlice = createSlice({
  name: "consultancy",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      title: "",
      contractingInstitution: "",
      grantYear: "",
      executionPeriod: "",
      objective: "",
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
        title: "",
        contractingInstitution: "",
        grantYear: "",
        executionPeriod: "",
        objective: "",
        accessURL: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = consultancySlice.actions;
export default consultancySlice.reducer;

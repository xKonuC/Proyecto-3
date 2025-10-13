import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      title: "",
      type: "",
      fundingSource: "",
      grantYear: "",
      executionPeriod: "",
      role: "Investigador Responsable",
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
        type: "",
        fundingSource: "",
        grantYear: "",
        executionPeriod: "",
        role: "Investigador Responsable",
        accessURL: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = projectSlice.actions;
export default projectSlice.reducer;

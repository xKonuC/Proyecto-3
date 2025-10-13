import { createSlice } from "@reduxjs/toolkit";

const academicInfoSlice = createSlice({
  name: "academicInfo",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      bestDegreeID: null,
      bondType: "",
      investigationLines: "",
      workedHours: "",
      hierarchy: "",
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
        bestDegreeID: null,
        bondType: "",
        investigationLines: "",
        workedHours: "",
        hierarchy: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = academicInfoSlice.actions;
export default academicInfoSlice.reducer;

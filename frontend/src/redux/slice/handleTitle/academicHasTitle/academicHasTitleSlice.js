import { createSlice } from "@reduxjs/toolkit";

const academicHasTitleSlice = createSlice({
  name: "academicHasTitle",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      titleID: null,
      titleYear: "",
      investigationLine: "",
      typeBond: "",
      studyField: "",
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
        titleID: null,
        titleYear: "",
        investigationLine: "",
        typeBond: "",
        studyField: "",
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = academicHasTitleSlice.actions;
export default academicHasTitleSlice.reducer;

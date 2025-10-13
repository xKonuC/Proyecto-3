import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      rut: "",
      firstName: "",
      secondName: "",
      surname1: "",
      surname2: "",
      sex: null,
      civilStatus: "",
      birthday: null,
      address: "",
      email: "",
      personalEmail: "",
      phone: "",
      workPlace: "",
      phoneWork: "",
      job: "",
      entry: null,
      group: null,
      articulation: null,
    },
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    clearFilteredItems: (state) => {
      state.filteredItems = null;
    },
    setNewItem: (state, action) => {
      state.newItem = { ...state.newItem, ...action.payload };
    },
    clearNewItem: (state) => {
      state.newItem = {
        rut: "",
        firstName: "",
        secondName: "",
        surname1: "",
        surname2: "",
        sex: null,
        civilStatus: "",
        birthday: null,
        address: "",
        email: "",
        personalEmail: "",
        phone: "",
        workPlace: "",
        phoneWork: "",
        job: "",
        entry: null,
        group: null,
        articulation: null,
      };
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = studentSlice.actions;
export default studentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const academicSlice = createSlice({
  name: "academic",
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
      personalEmail: "",
      email: "",
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

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = academicSlice.actions;
export default academicSlice.reducer;

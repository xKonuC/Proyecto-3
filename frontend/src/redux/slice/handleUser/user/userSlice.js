import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [],
    filteredItems: null,
    newItem: {
      rut: "",
      firstName: "",
      secondName: "",
      surname1: "",
      surname2: "",
      sex: "",
      civilStatus: "",
      birthday: "",
      address: "",
      email: "",
      personalEmail: "",
      phone: "",
      workPlace: "",
      phoneWork: "",
      job: "",
      entry: "",
      group: "",
      articulation: "",
    },
    selectedRoles: [],
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
        sex: "",
        civilStatus: "",
        birthday: "",
        address: "",
        email: "",
        personalEmail: "",
        phone: "",
        workPlace: "",
        phoneWork: "",
        job: "",
        entry: "",
        group: "",
        articulation: "",
      };
    },
    setSelectedRoles: (state, action) => {
      state.selectedRoles = action.payload;
    },
  },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem, setSelectedRoles } = userSlice.actions;
export default userSlice.reducer;

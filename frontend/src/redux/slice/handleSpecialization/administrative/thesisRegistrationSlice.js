import { createSlice } from "@reduxjs/toolkit";

const thesisRegistrationSlice = createSlice({
    name: "thesisRegistration",
    initialState: {
        items: [],
        filteredItems: null,
        newItem: {
            studentID: null,
            directorID: null,
            codirectorID: null,
            title: "",
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
                studentID: null,
                directorID: null,
                codirectorID: null,
                title: "",
            };
        },
    },
});

export const { setItems, setFilteredItems, clearFilteredItems, setNewItem, clearNewItem } = thesisRegistrationSlice.actions;
export default thesisRegistrationSlice.reducer;

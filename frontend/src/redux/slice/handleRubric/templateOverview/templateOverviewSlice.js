import { createSlice } from "@reduxjs/toolkit";

const templateOverviewSlice = createSlice({
    name: "templateOverview",
    initialState: {
        items: [],
        itemsCopy: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        setItemsCopy: (state, action) => {
            state.itemsCopy = action.payload;
        },
    },
});

export const { setItems, setItemsCopy } = templateOverviewSlice.actions;
export default templateOverviewSlice.reducer;

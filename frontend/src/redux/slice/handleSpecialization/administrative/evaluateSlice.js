import { createSlice } from "@reduxjs/toolkit";

const evaluateSlice = createSlice({
    name: "evaluate",
    initialState: {
        items: [],
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setItems } = evaluateSlice.actions;
export default evaluateSlice.reducer;

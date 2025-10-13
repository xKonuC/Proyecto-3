import { createSlice } from "@reduxjs/toolkit";

const confirmationSlice = createSlice({
  name: "confirmation",
  initialState: {
    hideMessageForever: false,
  },
  reducers: {
    setHideMessageForever: (state) => {
      state.hideMessageForever = true;
    },
  },
});

export const { setHideMessageForever } = confirmationSlice.actions;
export default confirmationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const evaluateSlice = createSlice({
  name: "evaluate",
  initialState: {
    evaluate: [],
    newEvaluate: {
      projectURL: "",
    },
  },
  reducers: {
    setEvaluate: (state, action) => {
      state.evaluate = action.payload;
    },
    setNewEvaluate: (state, action) => {
      state.newEvaluate = { ...state.newEvaluate, ...action.payload };
    },
    clearNewEvaluate: (state) => {
      state.newEvaluate = {
        projectURL: "",
      };
    },
  },
});

export const { setEvaluate, setNewEvaluate, clearNewEvaluate } = evaluateSlice.actions;
export default evaluateSlice.reducer;

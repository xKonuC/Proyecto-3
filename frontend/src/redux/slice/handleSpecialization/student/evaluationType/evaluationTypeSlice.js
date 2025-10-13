import { createSlice } from "@reduxjs/toolkit";

const evaluationTypeSlice = createSlice({
  name: "evaluationType",
  initialState: {
    evaluationType: [],
  },
  reducers: {
    setEvaluationType: (state, action) => {
      state.evaluationType = action.payload;
    },
  },
});

export const { setEvaluationType } = evaluationTypeSlice.actions;
export default evaluationTypeSlice.reducer;

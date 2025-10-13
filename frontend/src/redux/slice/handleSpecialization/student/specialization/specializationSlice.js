import { createSlice } from "@reduxjs/toolkit";

const specializationSlice = createSlice({
  name: "specialization",
  initialState: {
    specialization: [],
  },
  reducers: {
    setSpecialization: (state, action) => {
      state.specialization = action.payload;
    },
  },
});

export const { setSpecialization } = specializationSlice.actions;
export default specializationSlice.reducer;

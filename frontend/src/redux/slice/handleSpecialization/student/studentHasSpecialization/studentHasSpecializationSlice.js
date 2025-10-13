import { createSlice } from "@reduxjs/toolkit";

const studentHasSpecializationSlice = createSlice({
  name: "studentHasSpecialization",
  initialState: {
    studentHasSpecialization: [],
    newStudentHasSpecialization: {
        specializationID: 0,
        semesterID: 0,
    },
  },
  reducers: {
    setStudentHasSpecialization: (state, action) => {
      state.studentHasSpecialization = action.payload;
    },
    setNewStudentHasSpecialization: (state, action) => {
      state.newStudentHasSpecialization = { ...state.newStudentHasSpecialization, ...action.payload };
    },
    clearNewStudentHasSpecialization: (state) => {
      state.newStudentHasSpecialization = {
        specializationID: 0,
        semesterID: 0,
      };
    },
  },
});

export const { setStudentHasSpecialization, setNewStudentHasSpecialization, clearNewStudentHasSpecialization } = studentHasSpecializationSlice.actions;
export default studentHasSpecializationSlice.reducer;

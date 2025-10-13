import { createSlice } from "@reduxjs/toolkit";

const studentHasElectiveSlice = createSlice({
  name: "studentHasElective",
  initialState: {
    studentHasElective: [],
    newStudentHasElective: {
      semesterID: 0,
      specializationID: 0,
      number: 0,
      electiveID: 0,
    },
  },
  reducers: {
    setStudentHasElective: (state, action) => {
      state.studentHasElective = action.payload;
    },
    setNewStudentHasElective: (state, action) => {
      state.newStudentHasElective = { ...state.newStudentHasElective, ...action.payload };
    },
    clearNewStudentHasElective: (state) => {
      state.newStudentHasElective = {
        semesterID: 0,
        specializationID: 0,
        number: 0,
        electiveID: 0,
      };
    },
  },
});

export const { setStudentHasElective, setNewStudentHasElective, clearNewStudentHasElective } = studentHasElectiveSlice.actions;
export default studentHasElectiveSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const studentHasSemesterSlice = createSlice({
  name: "studentHasSemester",
  initialState: {
    studentHasSemester: [],
    newStudentHasSemester: {
      evaluationTypeID: 0,
      semesterID: 0,
      specializationID: 0,
    },
  },
  reducers: {
    setStudentHasSemester: (state, action) => {
      state.studentHasSemester = action.payload;
    },
    setNewStudentHasSemester: (state, action) => {
      state.newStudentHasSemester = { ...state.newStudentHasSemester, ...action.payload };
    },
    clearNewStudentHasSemester: (state) => {
      state.newStudentHasSemester = {
        evaluationTypeID: 0,
        semesterID: 0,
        specializationID: 0,
      };
    },
  },
});

export const { setStudentHasSemester, setNewStudentHasSemester, clearNewStudentHasSemester } = studentHasSemesterSlice.actions;
export default studentHasSemesterSlice.reducer;

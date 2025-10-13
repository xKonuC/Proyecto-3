import { createSlice } from "@reduxjs/toolkit";

const semesterSlice = createSlice({
  name: "semester",
  initialState: {
    semester: [],
    filteredItems: null,
    newSemester: {
      startDate: null,
      finishDate: null,
      year: '',
      semesterNumber: null,
    },
  },
  reducers: {
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    setNewSemester: (state, action) => {
      state.newSemester = {
        ...state.newSemester,
        ...action.payload,
        startDate: action.payload.startDate instanceof Date ? action.payload.startDate.toISOString() : action.payload.startDate,
        finishDate: action.payload.finishDate instanceof Date ? action.payload.finishDate.toISOString() : action.payload.finishDate,
      };
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    clearFilteredItems: (state) => {
      state.filteredItems = null;
    },
    clearNewSemester: (state) => {
      state.newSemester = {
        startDate: null,
        finishDate: null,
        year: '',
        semesterNumber: null,
      };
    },
  },
});

export const { setSemester, setFilteredItems, clearFilteredItems, setNewSemester, clearNewSemester } = semesterSlice.actions;
export default semesterSlice.reducer;

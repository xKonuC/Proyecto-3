import { combineReducers } from '@reduxjs/toolkit';
import studentHasTitleSlice from '../../slice/handleTitle/studentHasTitle/studentHasTitleSlice';
import academicHasTitleSlice from '../../slice/handleTitle/academicHasTitle/academicHasTitleSlice';
import titleSlice from '../../slice/handleTitle/title/titleSlice';
import universitySlice from '../../slice/handleTitle/university/universitySlice';

const handleTitleReducer = combineReducers({
  studentHasTitle: studentHasTitleSlice,
  academicHasTitle: academicHasTitleSlice,
  title: titleSlice,
  university: universitySlice,
});

export default handleTitleReducer;

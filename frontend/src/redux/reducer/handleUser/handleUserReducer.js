import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../../slice/handleUser/user/userSlice';
import academicSlice from '../../slice/handleUser/academic/academicSlice';
import studentSlice from '../../slice/handleUser/student/studentSlice';

const handleUserReducer = combineReducers({
    user: userSlice,
    academic: academicSlice,
    student: studentSlice,
});

export default handleUserReducer;

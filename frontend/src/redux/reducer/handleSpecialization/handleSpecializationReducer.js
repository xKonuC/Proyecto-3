import { combineReducers } from '@reduxjs/toolkit';
import administrativeReducer from './administrative/administrativeReducer';
import studentReducer from './student/studentReducer';

const handleSpecializationReducer = combineReducers({
  administrative: administrativeReducer,
  student: studentReducer,
});

export default handleSpecializationReducer;

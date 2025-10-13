import { combineReducers, configureStore } from '@reduxjs/toolkit';
import handleUserReducer from '../reducer/handleUser/handleUserReducer';
import handleTitleReducer from '../reducer/handleTitle/handleTitleReducer';
import documentSlice from '../slice/document/documentSlice';
import semesterSlice from '../slice/semester/semesterSlice';
import handleSpecializationReducer from '../reducer/handleSpecialization/handleSpecializationReducer';
import handleRubricReducer from '../reducer/handleRubric/handleRubricReducer';
import utilsReducer from '../reducer/utils/utilsReducer'
import handleAcademicRecordReducer from '../reducer/handleAcademicRecord/handleAcademicRecordReducer';

// Combina todos los reducers
const rootReducer = combineReducers({
  handleUser: handleUserReducer,
  handleTitle: handleTitleReducer,
  document: documentSlice,
  semester: semesterSlice,
  handleSpecialization: handleSpecializationReducer,
  handleRubric: handleRubricReducer,
  handleAcademicRecord: handleAcademicRecordReducer,
  utils: utilsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

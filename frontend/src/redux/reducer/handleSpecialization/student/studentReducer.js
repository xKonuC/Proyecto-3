import { combineReducers } from '@reduxjs/toolkit';
import studentHasSpecializationSlice from '../../../slice/handleSpecialization/student/studentHasSpecialization/studentHasSpecializationSlice';
import studentHasSemesterSlice from '../../../slice/handleSpecialization/student/studentHasSemester/studentHasSemesterSlice';
import studentHasElectiveSlice from '../../../slice/handleSpecialization/student/studentHasElective/studentHasElectiveSlice';
import specializationSlice from '../../../slice/handleSpecialization/student/specialization/specializationSlice'
import evaluationTypeSlice from '../../../slice/handleSpecialization/student/evaluationType/evaluationTypeSlice'
import evaluateSlice from '../../../slice/handleSpecialization/student/evaluate/evaluateSlice';

const studentReducer = combineReducers({
  studentHasSpecialization: studentHasSpecializationSlice,
  studentHasSemester: studentHasSemesterSlice,
  studentHasElective: studentHasElectiveSlice,
  specialization: specializationSlice,
  evaluationType: evaluationTypeSlice,
  evaluate: evaluateSlice,
});

export default studentReducer;

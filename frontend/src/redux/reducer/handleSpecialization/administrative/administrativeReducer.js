import { combineReducers } from '@reduxjs/toolkit';
import evaluationStatusSlice from '../../../slice/handleSpecialization/administrative/evaluationStatusSlice';
import evaluateSlice from '../../../slice/handleSpecialization/administrative/evaluateSlice';
import evaluatorAssignmentSlice from '../../../slice/handleSpecialization/administrative/evaluatorAssignmentSlice';
import ScoresAndEvaluatorSlice from '../../../slice/handleSpecialization/administrative/scoresAndEvaluatorSlice';
import thesisRegistrationSlice from '../../../slice/handleSpecialization/administrative/thesisRegistrationSlice';

const administrativeReducer = combineReducers({
  evaluationStatus: evaluationStatusSlice,
  evaluate: evaluateSlice,
  evaluatorAssignment: evaluatorAssignmentSlice,
  scoresAndEvaluator: ScoresAndEvaluatorSlice,
  thesisRegistration: thesisRegistrationSlice,
});

export default administrativeReducer;

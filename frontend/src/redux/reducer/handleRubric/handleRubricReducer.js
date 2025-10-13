import { combineReducers } from '@reduxjs/toolkit';
import rubricSlice from '../../slice/handleRubric/rubric/rubricSlice'
import questionSlice from '../../slice/handleRubric/question/questionSlice'
import templateSlice from '../../slice/handleRubric/template/templateSlice';
import sectionSlice from '../../slice/handleRubric/section/sectionSlice';
import templateOverviewSlice from '../../slice/handleRubric/templateOverview/templateOverviewSlice';

const handleRubricReducer = combineReducers({
  rubric: rubricSlice,
  template: templateSlice,
  question: questionSlice,
  section: sectionSlice,
  templateOverview: templateOverviewSlice
});

export default handleRubricReducer;

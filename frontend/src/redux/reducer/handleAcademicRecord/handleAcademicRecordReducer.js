import { combineReducers } from '@reduxjs/toolkit';
import academicInfoSlice from '../../slice/handleAcademicRecord/academicInfo/academicInfoSlice';
import bookChapterSlice from '../../slice/handleAcademicRecord/bookChapter/bookChapterSlice';
import consultancySlice from '../../slice/handleAcademicRecord/consultancy/consultancySlice';
import guidedThesisSlice from '../../slice/handleAcademicRecord/guidedThesis/guidedThesisSlice';
import patentSlice from '../../slice/handleAcademicRecord/patent/patentSlice';
import projectSlice from '../../slice/handleAcademicRecord/project/projectSlice';
import publicationSlice from '../../slice/handleAcademicRecord/publication/publicationSlice';

const handleAcademicRecordReducer = combineReducers({
  academicInfo: academicInfoSlice,
  bookChapter: bookChapterSlice,
  consultancy: consultancySlice,
  guidedThesis: guidedThesisSlice,
  patent: patentSlice,
  project: projectSlice,
  publication: publicationSlice,
});

export default handleAcademicRecordReducer;

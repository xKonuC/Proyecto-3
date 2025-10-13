import {
  express,
  academicRecordRoute,
  academicInfoRoute,
  bookChapterRoute,
  consultancyRoute,
  guidedThesisRoute,
  patentRoute,
  projectRoute,
  publicationRoute,
} from './handleAcademicRecord.modules.js';

const handleAcademicRecordRoute = express.Router();
handleAcademicRecordRoute.use('/academicRecord', academicRecordRoute);
handleAcademicRecordRoute.use('/academicInfo', academicInfoRoute);
handleAcademicRecordRoute.use('/bookChapter', bookChapterRoute);
handleAcademicRecordRoute.use('/consultancy', consultancyRoute);
handleAcademicRecordRoute.use('/guidedThesis', guidedThesisRoute);
handleAcademicRecordRoute.use('/patent', patentRoute);
handleAcademicRecordRoute.use('/project', projectRoute);
handleAcademicRecordRoute.use('/publication', publicationRoute);

export default handleAcademicRecordRoute;

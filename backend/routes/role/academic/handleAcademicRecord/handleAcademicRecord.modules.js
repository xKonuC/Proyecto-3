/* eslint-disable import/extensions */
import express from 'express';
import academicRecordRoute from '../../administrator/handleAcademicRecord/academicRecord/academicRecordRoute.js';
import academicInfoRoute from '../../administrator/handleAcademicRecord/academicInfo/academicInfoRoute.js';
import bookChapterRoute from '../../administrator/handleAcademicRecord/bookChapter/bookChapterRoute.js';
import consultancyRoute from '../../administrator/handleAcademicRecord/consultancy/consultancyRoute.js';
import guidedThesisRoute from '../../administrator/handleAcademicRecord/guidedThesis/guidedThesisRoute.js';
import patentRoute from '../../administrator/handleAcademicRecord/patent/patentRoute.js';
import projectRoute from '../../administrator/handleAcademicRecord/project/projectRoute.js';
import publicationRoute from '../../administrator/handleAcademicRecord/publication/publicationRoute.js';

export {
  express,
  academicRecordRoute,
  academicInfoRoute,
  bookChapterRoute,
  consultancyRoute,
  guidedThesisRoute,
  patentRoute,
  projectRoute,
  publicationRoute,
};

/* eslint-disable import/extensions */
import express from 'express';
import academicRecordRoute from './academicRecord/academicRecordRoute.js'; 
import academicInfoRoute from './academicInfo/academicInfoRoute.js';
import bookChapterRoute from './bookChapter/bookChapterRoute.js';
import consultancyRoute from './consultancy/consultancyRoute.js';
import guidedThesisRoute from './guidedThesis/guidedThesisRoute.js';
import patentRoute from './patent/patentRoute.js';
import projectRoute from './project/projectRoute.js';
import publicationRoute from './publication/publicationRoute.js';

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

/* eslint-disable import/extensions */
import express from 'express';
import titleRoute from './title/titleRoute.js';
import studentHasTitleRoute from './studentHasTitle/studentHasTitleRoute.js';
import academicHasTitleRoute from './academicHasTitle/academicHasTitleRoute.js';
import universityRoute from './university/universityRoute.js';

export {
  express,
  titleRoute,
  studentHasTitleRoute,
  academicHasTitleRoute,
  universityRoute,
};

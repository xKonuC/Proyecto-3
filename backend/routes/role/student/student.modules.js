/* eslint-disable import/extensions */
import express from 'express';
import userRoute from './user/userRoute.js';
import handleSpecializationRoute from './handleSpecialization/handleSpecialization.js';

export {
  express,
  handleSpecializationRoute,
  userRoute,
};

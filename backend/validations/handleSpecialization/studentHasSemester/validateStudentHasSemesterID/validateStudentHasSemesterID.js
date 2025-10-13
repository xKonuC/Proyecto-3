import { body, validationResult } from 'express-validator';

const validateStudentHasSemesterID = [
  body('studentHasSemesterID').isInt().withMessage('El StudentHasSemesterID no es válido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validateStudentHasSemesterID;

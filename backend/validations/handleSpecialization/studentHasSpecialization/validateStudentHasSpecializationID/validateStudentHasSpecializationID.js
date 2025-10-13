import { body, validationResult } from 'express-validator';

const validateStudentHasSpecializationID = [
  body('studentHasSpecializationID').isInt().withMessage('El StudentHasSpecializationID no es válido'),
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

export default validateStudentHasSpecializationID;

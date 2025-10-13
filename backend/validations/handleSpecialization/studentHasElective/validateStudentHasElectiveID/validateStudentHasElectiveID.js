import { body, validationResult } from 'express-validator';

const validateStudentHasElectiveID = [
  body('studentHasElectiveID').isInt().withMessage('El StudentHasElectiveID no es válido'),
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

export default validateStudentHasElectiveID;

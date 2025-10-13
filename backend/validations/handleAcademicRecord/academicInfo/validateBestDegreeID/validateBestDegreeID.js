import { body, validationResult } from 'express-validator';

const validateBestDegreeID = [
  body('bestDegreeID').isInt().withMessage('El BestDegreeID no es válido'),
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

export default validateBestDegreeID;

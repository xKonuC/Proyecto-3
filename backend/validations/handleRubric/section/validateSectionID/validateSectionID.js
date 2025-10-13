import { body, validationResult } from 'express-validator';

const validateSectionID = [
  body('sectionID').isInt().withMessage('El sectionID no es válido'),
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

export default validateSectionID;

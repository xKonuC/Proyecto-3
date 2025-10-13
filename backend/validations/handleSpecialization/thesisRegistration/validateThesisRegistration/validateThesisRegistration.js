import { body, validationResult } from 'express-validator';

const validateThesisRegistration = [
  body('directorID').isInt().withMessage('El Director no es válido'),
  body('codirectorID').isInt().optional({ nullable: true }).withMessage('El Co-Director no es válido'),
  body('title').optional({ nullable: true }).isString().withMessage('El Titulo no es válido'),
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

export default validateThesisRegistration;

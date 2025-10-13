import { body, validationResult } from 'express-validator';

const validateGuidedThesisID = [
  body('guidedThesisID').isInt().withMessage('El GuidedThesisID no es válido'),
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

export default validateGuidedThesisID;

import { body, validationResult } from 'express-validator';

const validateAccess = [
  body('access_token').exists().withMessage('El access_token no existe'),
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

export default validateAccess;

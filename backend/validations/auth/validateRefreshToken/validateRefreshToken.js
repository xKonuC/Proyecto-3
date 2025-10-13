import { body, validationResult } from 'express-validator';

const validateRefreshToken = [
  body('refresh_token').exists().withMessage('El refresh_token no existe'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateRefreshToken;

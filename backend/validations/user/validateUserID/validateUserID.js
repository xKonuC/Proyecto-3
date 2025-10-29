import { body, validationResult } from 'express-validator';

const validateUserID = [
  body('userID')
    .optional({ nullable: true, checkFalsy: true })
    .isInt().withMessage('El userID no es válido'),
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

export default validateUserID;

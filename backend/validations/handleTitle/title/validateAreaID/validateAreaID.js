import { body, validationResult } from 'express-validator';

const validateAreaID = [
  body('areaID').isInt().withMessage('El areaID no es válido'),
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

export default validateAreaID;

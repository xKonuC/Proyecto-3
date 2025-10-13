import { body, validationResult } from 'express-validator';

const validateRubric_UserID = [
  body('rubric1_ID').isInt().withMessage('El rubric1_ID no es válido'),
  body('rubric2_ID').isInt().withMessage('El rubric2_ID no es válido'),
  body('rubric3_ID').isInt().withMessage('El rubric3_ID no es válido'),
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

export default validateRubric_UserID;

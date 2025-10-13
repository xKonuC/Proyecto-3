/* eslint-disable no-restricted-syntax */
import { body, validationResult } from 'express-validator';

const validateArrayData = [
  body('dataArray')
    .isArray({ min: 1 }).withMessage('El arreglo no es válido o está vacío')
    .custom((value) => {
      const maxLengthArrayData = parseInt(process.env.MAX_LENGTH_ARRAY_DATA, 10);
      if (value.length > maxLengthArrayData) {
        throw new Error(`El arreglo no puede tener más de ${maxLengthArrayData} elementos`);
      }

      for (const item of value) {
        if (
          (!(typeof item.permissionID === 'number' || item.permissionID === null))
          || typeof item.dueDate !== 'string'
          || (!(typeof item.userHasPermissionID === 'number' || item.userHasPermissionID === null))
        ) {
          throw new Error('Cada elemento del arreglo debe tener permissionID y userHasPermissionID como números, y dueDate debe ser una fecha válida');
        }
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateArrayData;

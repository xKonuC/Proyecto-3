import pool from '../../../../../dbConnection.js';
import authPool from '../../../../../authDbConnection.js';
import { hashSync } from 'bcryptjs';

const createStudent = async (req, res) => {
  try {
    const {
      rut, firstName, secondName, surname1, surname2, sex, civilStatus, 
      birthday, address, email, personalEmail, phone, workPlace, 
      phoneWork, job, entry, group, articulation, roleIDs
    } = req.body;
    
    if (!rut || !firstName || !surname1 || !email) {
      return res.status(400).json({
        success: false,
        message: 'RUT, primer nombre, primer apellido y email son requeridos'
      });
    }

    const connection = await pool.getConnection();
    const authConnection = await authPool.getConnection();
    
    try {
      // Verificar si el usuario ya existe
      const [existingUser] = await connection.execute(
        'SELECT userID FROM user WHERE rut = ? OR email = ?',
        [rut, email]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'El usuario ya existe con este RUT o email'
        });
      }

      // Crear contraseña por defecto
      const defaultPassword = 'Password123!';
      const hashedPassword = hashSync(defaultPassword, 10);

      // Crear usuario en authdb
      const [authResult] = await authConnection.execute(
        'INSERT INTO userAccount (name, email, provider, password) VALUES (?, ?, ?, ?)',
        [`${firstName} ${secondName || ''} ${surname1} ${surname2 || ''}`.trim(), email, 'Email', hashedPassword]
      );

      const authUserId = authResult.insertId;

      // Procesar fecha de cumpleaños
      let processedBirthday = birthday;
      if (birthday) {
        const date = new Date(birthday);
        processedBirthday = date.toISOString().split('T')[0]; // YYYY-MM-DD
      }

      // Crear usuario en posgrado_db
      const [userResult] = await connection.execute(
        `INSERT INTO user (userID, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, \`group\`) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [authUserId, rut, firstName, secondName, surname1, surname2, sex, civilStatus, processedBirthday, address, email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, group]
      );

      // Asignar roles si se proporcionan
      if (roleIDs && Array.isArray(roleIDs) && roleIDs.length > 0) {
        for (const roleID of roleIDs) {
          await connection.execute(
            'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
            [authUserId, roleID]
          );
        }
      }

      res.json({
        success: true,
        message: 'Estudiante creado exitosamente',
        data: {
          userID: authUserId,
          rut,
          email,
          defaultPassword
        }
      });

    } finally {
      connection.release();
      authConnection.release();
    }
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el estudiante',
      error: error.message
    });
  }
};

export default createStudent;

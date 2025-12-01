import GraduateModel from '../models/Graduate.js';
import posgradoPool from '../posgradoDbConnection.js';

class GraduateController {
  
  static async getAllGraduates(req, res) {
    try {
      const graduates = await GraduateModel.findAll();
      res.json({
        success: true,
        data: graduates
      });
    } catch (error) {
      console.error('Error getting graduates:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener la lista de graduados',
        error: error.message
      });
    }
  }

  static async getGraduateById(req, res) {
    try {
      const { id } = req.params;
      const graduate = await GraduateModel.findById(id);
      
      if (!graduate) {
        return res.status(404).json({
          success: false,
          message: 'Graduado no encontrado'
        });
      }

      res.json({
        success: true,
        data: graduate
      });
    } catch (error) {
      console.error('Error getting graduate:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener el graduado',
        error: error.message
      });
    }
  }

  static async createGraduate(req, res) {
    let connection;
    let authConnection;
    
    try {
      console.log('Create Graduate Request Body:', req.body);

      const {
        rut, firstName, secondName, surname1, surname2, sex, civilStatus,
        birthday, address, email, personalEmail, phone, workPlace,
        phoneWork, job, entryYear, graduationYear, group, articulation,
        entry, roleIDs // Fallback for entryYear
      } = req.body;

      // Use entry if entryYear is missing
      const finalEntryYear = entryYear || entry;

      const missingFields = [];
      if (!rut) missingFields.push('rut');
      if (!firstName) missingFields.push('firstName');
      if (!surname1) missingFields.push('surname1');
      if (!email) missingFields.push('email');
      if (!finalEntryYear) missingFields.push('entryYear');

      if (missingFields.length > 0) {
        console.warn('Missing fields for create graduate:', missingFields);
        return res.status(400).json({
          success: false,
          message: `Faltan campos obligatorios: ${missingFields.join(', ')}`
        });
      }

      connection = await posgradoPool.getConnection();
      const authPool = (await import('../authDbConnection.js')).default;
      authConnection = await authPool.getConnection();
      const { hashSync } = await import('bcryptjs');

      await connection.beginTransaction();

      try {
        // Verificar si el email ya existe en authdb
        const [existingAuthUser] = await authConnection.execute(
          'SELECT id FROM userAccount WHERE email = ?',
          [email]
        );

        if (existingAuthUser.length > 0) {
          throw new Error('Ya existe un usuario con este email');
        }

        // Verificar si el usuario ya existe en posgrado_db
        const [existingUser] = await connection.execute(
          'SELECT userID FROM user WHERE rut = ? OR email = ?',
          [rut, email]
        );

        if (existingUser.length > 0) {
          throw new Error('Ya existe un usuario con este RUT o email');
        }

        // Verificar si el RUT ya existe en la tabla graduate
        const [existingGraduate] = await connection.execute(
          'SELECT graduateID FROM graduate WHERE rut = ?',
          [rut]
        );

        if (existingGraduate.length > 0) {
          throw new Error('Ya existe un graduado con este RUT');
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
        // Default to '1900-01-01' if not provided, as it cannot be null
        let processedBirthday = '1900-01-01';
        if (birthday) {
          const date = new Date(birthday);
          processedBirthday = date.toISOString().split('T')[0];
        }

        // Convertir undefined a null para evitar errores de binding
        const safeSecondName = secondName || null;
        const safeSurname2 = surname2 || null;
        // Default sex to 'O' (Otro) if not provided, as it cannot be null
        const safeSex = sex || 'O';
        const safeCivilStatus = civilStatus || null;
        const safeAddress = address || null;
        const safePersonalEmail = personalEmail || null;
        const safePhone = phone || null;
        const safeWorkPlace = workPlace || null;
        const safePhoneWork = phoneWork || null;
        const safeJob = job || null;
        const safeArticulation = articulation || null;
        const safeGroup = group || null;
        const safeGraduationYear = graduationYear || null;

        // Crear usuario en posgrado_db
        await connection.execute(
          `INSERT INTO user (userID, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, \`group\`) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [authUserId, rut, firstName, safeSecondName, surname1, safeSurname2, safeSex, safeCivilStatus, processedBirthday, safeAddress, email, safePersonalEmail, safePhone, finalEntryYear, safeWorkPlace, safePhoneWork, safeJob, safeArticulation, safeGroup]
        );

        // Asignar roles
        // Si se asigna rol de Graduado (5), asegurar que también tenga rol de Estudiante (4)
        // para que aparezca en la lista de estudiantes.
        let rolesToAssign = (roleIDs && roleIDs.length > 0) ? roleIDs : [5];
        
        if (rolesToAssign.includes(5) && !rolesToAssign.includes(4)) {
          rolesToAssign.push(4);
        }
        
        for (const roleID of rolesToAssign) {
           await connection.execute(
            'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
            [authUserId, roleID]
          );
        }

        // Crear registro en tabla graduate
        // REMOVED sex and address columns to match schema
        await connection.execute(
          `INSERT INTO graduate (userID, rut, firstName, secondName, surname1, surname2, email, workPlace, job, entryYear, graduationYear)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [authUserId, rut, firstName, safeSecondName, surname1, safeSurname2, email, safeWorkPlace, safeJob, finalEntryYear, safeGraduationYear]
        );

        // Obtener el graduado creado
        const [newGraduate] = await connection.execute(
          'SELECT * FROM graduate WHERE userID = ?',
          [authUserId]
        );
        
        await connection.commit();

        res.status(201).json({
          success: true,
          message: 'Graduado creado exitosamente',
          data: {
            ...newGraduate[0],
            defaultPassword
          }
        });

      } catch (error) {
        await connection.rollback();
        // Si se creó el usuario en authdb pero falló la transacción en posgrado_db, deberíamos intentar eliminarlo de authdb
        // Sin embargo, authdb está en otra conexión/pool, así que no es parte de la transacción de posgrado_db.
        // Idealmente, esto debería manejarse mejor (transacción distribuida o compensación), pero por ahora lanzamos el error.
        throw error;
      }

    } catch (error) {
      console.error('Error creating graduate:', error);

      // Manejar errores específicos de MySQL o lanzados manualmente
      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Ya existe')) {
        return res.status(409).json({
          success: false,
          message: error.message || 'El email o RUT ya está registrado'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al crear el graduado',
        error: error.message
      });
    } finally {
      if (connection) connection.release();
      if (authConnection) authConnection.release();
    }
  }

  static async updateGraduate(req, res) {
    let connection;
    
    try {
      const { id } = req.params;
      const data = req.body;

      const sanitizedData = {};
      
      Object.keys(data).forEach(key => {
        const value = data[key];
        
        if (value === '') {
          return;
        }
        
        sanitizedData[key] = value;
      });

      connection = await posgradoPool.getConnection();
      await connection.beginTransaction();

      try {
        // Obtener el graduado actual para obtener el userID
        const graduate = await GraduateModel.findById(id);

        if (!graduate) {
          await connection.rollback();
          return res.status(404).json({
            success: false,
            message: 'Graduado no encontrado',
          });
        }

        const userID = graduate.userID;

        // Actualizar la tabla graduate
        const affectedRows = await GraduateModel.update(id, sanitizedData);

        // Actualizar la tabla user con los campos correspondientes
        // Mapear campos de graduate a user
        const userUpdateFields = [];
        const userUpdateValues = [];

        const fieldMapping = {
          'rut': 'rut',
          'firstName': 'firstName',
          'secondName': 'secondName',
          'surname1': 'surname1',
          'surname2': 'surname2',
          'email': 'email',
          'workPlace': 'workPlace',
          'job': 'job',
          'entryYear': 'entry'
        };

        Object.keys(sanitizedData).forEach(key => {
          if (fieldMapping[key]) {
            userUpdateFields.push(`${fieldMapping[key]} = ?`);
            userUpdateValues.push(sanitizedData[key]);
          }
        });

        // Si hay campos para actualizar en user, ejecutar la actualización
        if (userUpdateFields.length > 0) {
          userUpdateValues.push(userID);
          const updateUserQuery = `UPDATE user SET ${userUpdateFields.join(', ')} WHERE userID = ?`;
          await connection.execute(updateUserQuery, userUpdateValues);
        }

        await connection.commit();

        const updatedGraduate = await GraduateModel.findById(id);

        res.json({
          success: true,
          message: 'Graduado actualizado exitosamente',
          data: updatedGraduate,
        });
      } catch (error) {
        await connection.rollback();
        throw error;
      }
    } catch (error) {
      console.error('Error updating graduate:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar el graduado',
        error: error.message,
      });
    } finally {
      if (connection) connection.release();
    }
  }

  static async deleteGraduate(req, res) {
    try {
      const { id } = req.params;
      const result = await GraduateModel.delete(id);

      if (result === 0) {
        return res.status(404).json({
          success: false,
          message: 'Graduado no encontrado',
        });
      }

      res.json({
        success: true,
        message: 'Graduado eliminado exitosamente',
      });
    } catch (error) {
      console.error('Error deleting graduate:', error);
      res.status(500).json({
        success: false,
        message: 'Error al eliminar el graduado',
        error: error.message,
      });
    }
  }
}

export default GraduateController;

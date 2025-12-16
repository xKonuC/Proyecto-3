import posgradoPool from '../../../../../posgradoDbConnection.js';
import authPool from '../../../../../authDbConnection.js';
import { hashSync } from 'bcryptjs';

const createGraduate = async (req, res) => {
  let connection;
  let authConnection;

  try {
    const {
      rut, firstName, secondName, surname1, surname2,
      sex, civilStatus, birthday, address,
      email, personalEmail, phone,
      workPlace, phoneWork, job,
      entry, group, articulation,
      roleIDs
    } = req.body;

    if (!rut || !firstName || !surname1 || !email) {
      return res.status(400).json({
        success: false,
        message: 'RUT, primer nombre, primer apellido y email son requeridos',
      });
    }

    connection = await posgradoPool.getConnection();
    authConnection = await authPool.getConnection();

    // ✅ Recomendado: charset
    await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');

    // Verificar si ya existe en posgrado
    const [existingUser] = await connection.execute(
      'SELECT userID FROM user WHERE rut = ? OR email = ?',
      [rut, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe con este RUT o email',
      });
    }

    // Contraseña por defecto
    const defaultPassword = 'Password123!';
    const hashedPassword = hashSync(defaultPassword, 10);

    // Procesar fecha
    let processedBirthday = birthday || null;
    if (birthday) {
      const d = new Date(birthday);
      processedBirthday = d.toISOString().split('T')[0];
    }

    // ⚠️ No hay transacción real entre DBs distintas, pero hacemos compensación
    // 1) Crear en authdb
    const [authResult] = await authConnection.execute(
      'INSERT INTO userAccount (name, email, provider, password) VALUES (?, ?, ?, ?)',
      [`${firstName} ${secondName || ''} ${surname1} ${surname2 || ''}`.trim(), email, 'Email', hashedPassword]
    );

    const authUserId = authResult.insertId;

    try {
      // 2) Crear en posgrado usando el mismo ID
      await connection.execute(
        `INSERT INTO user
          (userID, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address,
           email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, \`group\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          authUserId,
          rut,
          firstName,
          secondName || null,
          surname1,
          surname2 || null,
          sex || null,
          civilStatus || null,
          processedBirthday,
          address || null,
          email,
          personalEmail || null,
          phone || null,
          entry || null,
          workPlace || null,
          phoneWork || null,
          job || null,
          articulation ?? null,
          group ?? null
        ]
      );

      // Rol graduado (5)
      await connection.execute(
        'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
        [authUserId, 5]
      );

      // Otros roles
      if (roleIDs && Array.isArray(roleIDs) && roleIDs.length > 0) {
        for (const roleID of roleIDs) {
          if (parseInt(roleID, 10) !== 5) {
            await connection.execute(
              'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
              [authUserId, roleID]
            );
          }
        }
      }

      return res.json({
        success: true,
        message: 'Graduado creado exitosamente',
        data: { userID: authUserId, rut, email, defaultPassword },
      });

    } catch (posgradoError) {
      // ✅ Compensación: si falló posgrado, borramos auth userAccount
      await authConnection.execute('DELETE FROM userAccount WHERE id = ?', [authUserId]);
      throw posgradoError;
    }

  } catch (error) {
    console.error('Error creating graduate:', error);

    // Si el error es duplicado de PK, casi seguro es AUTO_INCREMENT desfasado en authdb
    if (error?.code === 'ER_DUP_ENTRY') {
      return res.status(500).json({
        success: false,
        message:
          'Error: el ID generado en authdb ya existe en posgrado_db. Debes sincronizar AUTO_INCREMENT en authdb (ver MAX(userID) en posgrado).',
        error: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al crear el graduado',
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
    if (authConnection) authConnection.release();
  }
};

export default createGraduate;

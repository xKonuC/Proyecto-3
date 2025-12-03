import posgradoPool from '../../../../../posgradoDbConnection.js';
import GraduateModel from '../../../../../models/Graduate.js';

const updateStudentRole = async (req, res) => {
  try {
    // Explicitly get userID from body to avoid any confusion
    const targetUserID = req.body.userID;
    const newRoleID = req.body.newRoleID;

    if (!targetUserID || !newRoleID) {
      return res.status(400).json({
        success: false,
        message: 'userID y newRoleID son requeridos'
      });
    }

    const connection = await posgradoPool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Verificar que el usuario existe
      const [user] = await connection.execute(
        'SELECT * FROM user WHERE userID = ?',
        [targetUserID]
      );

      if (user.length === 0) {
        await connection.rollback();
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      // Verificar que el rol existe
      const [role] = await connection.execute(
        'SELECT roleID, name FROM role WHERE roleID = ?',
        [newRoleID]
      );

      if (role.length === 0) {
        await connection.rollback();
        return res.status(404).json({
          success: false,
          message: 'Rol no encontrado'
        });
      }

      // Si el nuevo rol es Graduado (5), verificar y crear registro en graduate si no existe
      if (parseInt(newRoleID) === 5) {
        console.log('🔍 Rol de Graduado detectado. Verificando existencia en tabla graduate...');
        const existingGraduate = await GraduateModel.findByUserId(targetUserID, connection);
        
        if (!existingGraduate) {
          console.log('⚠️ Usuario no existe en tabla graduate. Creando registro...');
          
          const userData = user[0];
          const currentYear = new Date().getFullYear();
          
          const graduateData = {
            userID: userData.userID,
            rut: userData.rut,
            firstName: userData.firstName,
            secondName: userData.secondName,
            surname1: userData.surname1,
            surname2: userData.surname2,
            email: userData.email,
            workPlace: null,
            job: null,
            entryYear: userData.entry || currentYear, // Usar user.entry si existe, sino año actual
            graduationYear: null
          };
          
          await GraduateModel.create(graduateData, connection);
          console.log('✅ Registro de graduado creado automáticamente.');
        } else {
          console.log('✅ El usuario ya existe en la tabla graduate.');
        }
      } else {
        // Si el nuevo rol NO es Graduado, verificar si existe en graduate y eliminarlo
        console.log('🔍 Nuevo rol no es Graduado. Verificando si existe registro en graduate para eliminar...');
        const existingGraduate = await GraduateModel.findByUserId(targetUserID, connection);
        
        if (existingGraduate) {
          console.log(`⚠️ Eliminando registro de graduado (ID: ${existingGraduate.graduateID}) porque el usuario ya no tiene rol de graduado...`);
          await GraduateModel.delete(existingGraduate.graduateID, connection);
          console.log('✅ Registro de graduado eliminado.');
        }
      }

      // Primero, verificar roles actuales del usuario
      const [currentRoles] = await connection.execute(
        'SELECT roleID FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [targetUserID]
      );
      // console.log('Roles actuales antes de DELETE:', currentRoles);

      // Eliminar solo los roles de estudiante/graduado (4 y 5), mantener roles administrativos
      // Usamos targetUserID explícitamente
      await connection.execute(
        'DELETE FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [targetUserID]
      );

      // Asignar el nuevo rol
      // Si el nuevo rol es Graduado (5), asignamos también Estudiante (4)
      if (parseInt(newRoleID) === 5) {
        await connection.execute(
          'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
          [targetUserID, 4]
        );
        await connection.execute(
          'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
          [targetUserID, 5]
        );
      } else {
        await connection.execute(
          'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
          [targetUserID, newRoleID]
        );
      }

      await connection.commit();

      res.json({
        success: true,
        message: `Rol del usuario actualizado a ${role[0].name}`,
        data: {
          userID: targetUserID,
          newRoleID,
          roleName: role[0].name
        }
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating student role:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el rol del estudiante',
      error: error.message
    });
  }
};

export default updateStudentRole;
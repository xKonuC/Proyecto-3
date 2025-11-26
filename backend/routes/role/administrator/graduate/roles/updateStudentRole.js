import posgradoPool from '../../../../../posgradoDbConnection.js';

const updateStudentRole = async (req, res) => {
  console.log('=== updateStudentRole called ===');
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  console.log('Request method:', req.method);
  console.log('Request URL:', req.url);
  try {
    const { userID, newRoleID } = req.body;
    
    if (!userID || !newRoleID) {
      return res.status(400).json({
        success: false,
        message: 'userID y newRoleID son requeridos'
      });
    }

    const connection = await posgradoPool.getConnection();
    
    try {
      // Verificar que el usuario existe
      const [user] = await connection.execute(
        'SELECT userID FROM user WHERE userID = ?',
        [userID]
      );

      if (user.length === 0) {
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
        return res.status(404).json({
          success: false,
          message: 'Rol no encontrado'
        });
      }

<<<<<<< Updated upstream
      // Eliminar solo los roles de estudiante/egresado (4 y 5), mantener roles administrativos
      await connection.execute(
=======
      // Primero, verificar roles actuales del usuario
      const [currentRoles] = await connection.execute(
        'SELECT roleID FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [userID]
      );
      // console.log('Roles actuales antes de DELETE:', currentRoles);

      // Eliminar solo los roles de estudiante/graduado (4 y 5), mantener roles administrativos
      const deleteResult = await connection.execute(
>>>>>>> Stashed changes
        'DELETE FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [userID]
      );
      // console.log('DELETE result:', deleteResult);

      // Asignar el nuevo rol
      const insertResult = await connection.execute(
        'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
        [userID, newRoleID]
      );
      // console.log('INSERT result:', insertResult);

      // Verificar que se realizaron los cambios
      const [updatedRoles] = await connection.execute(
        'SELECT roleID FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [userID]
      );
      // console.log('Roles actuales después de INSERT:', updatedRoles);

      res.json({
        success: true,
        message: `Rol del usuario actualizado a ${role[0].name}`,
        data: {
          userID,
          newRoleID,
          roleName: role[0].name
        }
      });

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

import posgradoPool from '../../../../../posgradoDbConnection.js';

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
      // Verificar que el usuario existe
      const [user] = await connection.execute(
        'SELECT userID FROM user WHERE userID = ?',
        [targetUserID]
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

      // Eliminar solo los roles de estudiante/graduado (4 y 5), mantener roles administrativos
      // Usamos targetUserID explícitamente
      await connection.execute(
        'DELETE FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [targetUserID]
      );

      // Asignar el nuevo rol
      await connection.execute(
        'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
        [targetUserID, newRoleID]
      );

      res.json({
        success: true,
        message: `Rol del usuario actualizado a ${role[0].name}`,
        data: {
          userID: targetUserID,
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

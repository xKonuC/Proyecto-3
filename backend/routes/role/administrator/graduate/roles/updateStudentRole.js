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

      // Eliminar solo los roles de estudiante/egresado (4 y 5), mantener roles administrativos
      await connection.execute(
        'DELETE FROM userHasRole WHERE userID = ? AND roleID IN (4, 5)',
        [userID]
      );

      // Asignar el nuevo rol
      await connection.execute(
        'INSERT INTO userHasRole (userID, roleID) VALUES (?, ?)',
        [userID, newRoleID]
      );

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

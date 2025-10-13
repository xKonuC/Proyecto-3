import pool from '../../../../../dbConnection.js';

const updateStudentRole = async (req, res) => {
  try {
    const { userID, newRoleID } = req.body;
    
    if (!userID || !newRoleID) {
      return res.status(400).json({
        success: false,
        message: 'userID y newRoleID son requeridos'
      });
    }

    const connection = await pool.getConnection();
    
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

      // Actualizar el rol del usuario
      await connection.execute(
        'UPDATE userHasRole SET roleID = ? WHERE userID = ?',
        [newRoleID, userID]
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

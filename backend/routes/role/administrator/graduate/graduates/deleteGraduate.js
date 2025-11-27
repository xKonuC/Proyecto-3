import posgradoPool from '../../../../../posgradoDbConnection.js';
import authPool from '../../../../../authDbConnection.js';

const deleteGraduate = async (req, res) => {
  try {
    const { userIDs } = req.body;
    console.log(userIDs)
    if (!userIDs || !Array.isArray(userIDs) || userIDs.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'userIDs es requerido y debe ser un array'
      });
    }

    const connection = await posgradoPool.getConnection();
    const authConnection = await authPool.getConnection();
    
    try {
      let deletedCount = 0;
      const errors = [];

      for (const userID of userIDs) {
        try {
          // Eliminar roles del usuario
          await connection.execute(
            'DELETE FROM userHasRole WHERE userID = ?',
            [userID]
          );

          // Eliminar usuario de posgrado_db
          const [userResult] = await connection.execute(
            'DELETE FROM user WHERE userID = ?',
            [userID]
          );

          // Eliminar usuario de authdb
          const [authResult] = await authConnection.execute(
            'DELETE FROM userAccount WHERE id = ?',
            [userID]
          );

          if (userResult.affectedRows > 0 && authResult.affectedRows > 0) {
            deletedCount++;
          }
        } catch (error) {
          errors.push(`Error eliminando usuario ${userID}: ${error.message}`);
        }
      }

      if (deletedCount > 0) {
        res.json({
          success: true,
          message: `${deletedCount} graduado(s) eliminado(s) exitosamente`,
          data: {
            deletedCount,
            errors: errors.length > 0 ? errors : undefined
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo eliminar ningún graduado',
          errors
        });
      }

    } finally {
      connection.release();
      authConnection.release();
    }
  } catch (error) {
    console.error('Error deleting graduates:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar graduados',
      error: error.message
    });
  }
};

export default deleteGraduate;

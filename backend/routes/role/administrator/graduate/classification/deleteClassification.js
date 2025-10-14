import pool from '../../../../../dbConnection.js';

const deleteClassification = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID de clasificación es requerido'
      });
    }

    const connection = await pool.getConnection();
    
    try {
      // Verificar que la clasificación existe
      const [existingClassification] = await connection.execute(`
        SELECT classificationID FROM classification WHERE classificationID = ?
      `, [id]);

      if (existingClassification.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Clasificación no encontrada'
        });
      }

      // Eliminar asociaciones de egresados
      await connection.execute(`
        DELETE FROM userHasClassification WHERE classificationID = ?
      `, [id]);

      // Eliminar la clasificación
      const [result] = await connection.execute(`
        DELETE FROM classification WHERE classificationID = ?
      `, [id]);

      if (result.affectedRows > 0) {
        res.json({
          success: true,
          message: 'Clasificación eliminada exitosamente'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo eliminar la clasificación'
        });
      }

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error deleting classification:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la clasificación',
      error: error.message
    });
  }
};

export default deleteClassification;

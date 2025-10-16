import pool from '../../../../../dbConnection.js';

const updateClassification = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, criteria, graduateIds } = req.body;
    
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

      // Actualizar la clasificación
      const updateFields = [];
      const updateValues = [];

      if (name !== undefined) {
        updateFields.push('name = ?');
        updateValues.push(name);
      }
      if (description !== undefined) {
        updateFields.push('description = ?');
        updateValues.push(description);
      }
      if (criteria !== undefined) {
        updateFields.push('criteria = ?');
        updateValues.push(JSON.stringify(criteria));
      }
      
      updateFields.push('updatedAt = NOW()');
      updateValues.push(id);

      if (updateFields.length > 1) { // Más que solo updatedAt
        await connection.execute(`
          UPDATE classification 
          SET ${updateFields.join(', ')}
          WHERE classificationID = ?
        `, updateValues);
      }

      // Actualizar egresados asociados si se proporcionan
      if (graduateIds !== undefined) {
        // Eliminar asociaciones existentes
        await connection.execute(`
          DELETE FROM userHasClassification WHERE classificationID = ?
        `, [id]);

        // Crear nuevas asociaciones
        if (Array.isArray(graduateIds) && graduateIds.length > 0) {
          for (const graduateId of graduateIds) {
            await connection.execute(`
              INSERT INTO userHasClassification (userID, classificationID, classifiedAt, classifiedBy)
              VALUES (?, ?, NOW(), ?)
            `, [graduateId, id, req.user?.userID || 'system']);
          }
        }
      }

      res.json({
        success: true,
        message: 'Clasificación actualizada exitosamente'
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating classification:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar la clasificación',
      error: error.message
    });
  }
};

export default updateClassification;



import pool from '../../../../../dbConnection.js';

const updateStudent = async (req, res) => {
  try {
    console.log('Update student request body:', req.body);
    
    const { userID, ...updateData } = req.body;
    
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: 'userID es requerido'
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

      // Actualizar los datos del usuario
      const updateFields = [];
      const updateValues = [];
      
      const allowedFields = [
        'firstName', 'secondName', 'surname1', 'surname2', 
        'email', 'personalEmail', 'phone', 'entry', 'group', 
        'articulation', 'sex', 'civilStatus', 'birthday', 
        'address', 'workPlace', 'phoneWork', 'job'
      ];

      for (const [key, value] of Object.entries(updateData)) {
        if (allowedFields.includes(key) && value !== undefined && value !== null) {
          // Usar backticks para palabras reservadas de MySQL
          const fieldName = key === 'group' ? '`group`' : key;
          updateFields.push(`${fieldName} = ?`);
          
          // Convertir fecha a formato MySQL si es necesario
          let processedValue = value;
          if (key === 'birthday' && value) {
            const date = new Date(value);
            processedValue = date.toISOString().split('T')[0]; // YYYY-MM-DD
          }
          
          updateValues.push(processedValue);
        }
      }

      console.log('Update fields:', updateFields);
      console.log('Update values:', updateValues);

      if (updateFields.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No hay campos válidos para actualizar'
        });
      }

      updateValues.push(userID);

      const updateQuery = `UPDATE user SET ${updateFields.join(', ')} WHERE userID = ?`;
      console.log('Update query:', updateQuery);
      console.log('Update values with userID:', updateValues);

      const [result] = await connection.execute(updateQuery, updateValues);

      console.log('Update result:', result);

      if (result.affectedRows > 0) {
        res.json({
          success: true,
          message: 'Estudiante actualizado exitosamente',
          data: {
            userID,
            affectedRows: result.affectedRows
          }
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'No se pudo actualizar el estudiante'
        });
      }

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el estudiante',
      error: error.message
    });
  }
};

export default updateStudent;

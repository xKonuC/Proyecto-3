import pool from '../../../../../dbConnection.js';

const createClassification = async (req, res) => {
  try {
    const { name, description, criteria, graduateIds } = req.body;
    
    if (!name || !description || !criteria) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, descripción y criterios son requeridos'
      });
    }

    const connection = await pool.getConnection();
    
    try {
      // Crear la clasificación
      const [classificationResult] = await connection.execute(`
        INSERT INTO classification (name, description, criteria, createdAt, updatedAt)
        VALUES (?, ?, ?, NOW(), NOW())
      `, [name, description, JSON.stringify(criteria)]);

      const classificationId = classificationResult.insertId;

      // Asociar egresados a la clasificación si se proporcionan
      if (graduateIds && Array.isArray(graduateIds) && graduateIds.length > 0) {
        for (const graduateId of graduateIds) {
          await connection.execute(`
            INSERT INTO userHasClassification (userID, classificationID, classifiedAt, classifiedBy)
            VALUES (?, ?, NOW(), ?)
          `, [graduateId, classificationId, req.user?.userID || 'system']);
        }
      }

      res.json({
        success: true,
        message: 'Clasificación creada exitosamente',
        data: {
          classificationId,
          name,
          description,
          criteria
        }
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating classification:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear la clasificación',
      error: error.message
    });
  }
};

export default createClassification;



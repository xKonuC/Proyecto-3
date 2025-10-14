import pool from '../../../../../dbConnection.js';

const generateClassificationsReport = async (req, res) => {
  try {
    const { dateRange } = req.body;
    const connection = await pool.getConnection();
    
    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');

      let dateFilter = '';
      if (dateRange && dateRange.startDate && dateRange.endDate) {
        dateFilter = `AND c.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`;
      }

      // Obtener estadísticas de clasificaciones
      const [classificationsStats] = await connection.execute(`
        SELECT 
          COUNT(*) as totalClassifications,
          COUNT(CASE WHEN uhc.userID IS NOT NULL THEN 1 END) as classificationsWithGraduates,
          AVG(graduateCount.graduateCount) as averageGraduatesPerClassification
        FROM classification c
        LEFT JOIN userHasClassification uhc ON c.classificationID = uhc.classificationID
        LEFT JOIN (
          SELECT 
            classificationID, 
            COUNT(*) as graduateCount
          FROM userHasClassification
          GROUP BY classificationID
        ) graduateCount ON c.classificationID = graduateCount.classificationID
        WHERE 1=1 ${dateFilter}
      `);

      // Obtener lista de clasificaciones con detalles
      const [classificationsList] = await connection.execute(`
        SELECT 
          c.classificationID,
          c.name as classificationName,
          c.description,
          c.criteria,
          c.createdAt,
          c.updatedAt,
          COUNT(uhc.userID) as graduateCount,
          GROUP_CONCAT(
            CONCAT(u.firstName, ' ', u.surname1) 
            ORDER BY u.firstName, u.surname1 
            SEPARATOR ', '
          ) as graduatesList
        FROM classification c
        LEFT JOIN userHasClassification uhc ON c.classificationID = uhc.classificationID
        LEFT JOIN user u ON uhc.userID = u.userID
        WHERE 1=1 ${dateFilter}
        GROUP BY c.classificationID, c.name, c.description, c.criteria, c.createdAt, c.updatedAt
        ORDER BY c.createdAt DESC
      `);

      // Obtener distribución de egresados por clasificación
      const [graduatesByClassification] = await connection.execute(`
        SELECT 
          c.name as classificationName,
          COUNT(uhc.userID) as graduateCount,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount
        FROM classification c
        LEFT JOIN userHasClassification uhc ON c.classificationID = uhc.classificationID
        LEFT JOIN user u ON uhc.userID = u.userID
        WHERE 1=1 ${dateFilter}
        GROUP BY c.classificationID, c.name
        ORDER BY graduateCount DESC
      `);

      // Obtener criterios más utilizados
      const [mostUsedCriteria] = await connection.execute(`
        SELECT 
          'Criterios más utilizados' as criteriaType,
          COUNT(*) as usageCount
        FROM classification c
        WHERE c.criteria IS NOT NULL AND c.criteria != '' ${dateFilter}
        GROUP BY 'Criterios más utilizados'
      `);

      const reportData = {
        classificationsStats: classificationsStats[0],
        classificationsList: classificationsList,
        graduatesByClassification: graduatesByClassification,
        mostUsedCriteria: mostUsedCriteria,
        generatedAt: new Date().toISOString(),
        dateRange: dateRange || null
      };

      res.json({
        success: true,
        data: reportData,
        message: 'Reporte de clasificaciones generado exitosamente'
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating classifications report:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de clasificaciones',
      error: error.message
    });
  }
};

export default generateClassificationsReport;

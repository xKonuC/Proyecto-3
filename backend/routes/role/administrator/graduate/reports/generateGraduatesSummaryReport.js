import pool from '../../../../../dbConnection.js';

const generateGraduatesSummaryReport = async (req, res) => {
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
        dateFilter = `AND u.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`;
      }

      // Obtener estadísticas detalladas de egresados
      const [graduatesStats] = await connection.execute(`
        SELECT 
          COUNT(*) as totalGraduates,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount,
          AVG(u.entry) as averageEntryYear,
          MIN(u.entry) as earliestEntry,
          MAX(u.entry) as latestEntry
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 ${dateFilter}
      `);

      // Obtener distribución por año de ingreso
      const [distributionByYear] = await connection.execute(`
        SELECT 
          u.entry as year,
          COUNT(*) as count,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 ${dateFilter}
        GROUP BY u.entry
        ORDER BY u.entry DESC
      `);

      // Obtener distribución por estado civil
      const [distributionByCivilStatus] = await connection.execute(`
        SELECT 
          u.civilStatus,
          COUNT(*) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.civilStatus IS NOT NULL ${dateFilter}
        GROUP BY u.civilStatus
        ORDER BY count DESC
      `);

      // Obtener lista detallada de egresados
      const [graduatesList] = await connection.execute(`
        SELECT 
          u.userID,
          u.rut,
          u.firstName,
          u.secondName,
          u.surname1,
          u.surname2,
          u.email,
          u.personalEmail,
          u.phone,
          u.entry,
          u.workPlace,
          u.job,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 ${dateFilter}
        ORDER BY u.firstName, u.surname1
      `);

      const reportData = {
        summary: graduatesStats[0],
        distributionByYear: distributionByYear,
        distributionByCivilStatus: distributionByCivilStatus,
        graduatesList: graduatesList,
        generatedAt: new Date().toISOString(),
        dateRange: dateRange || null
      };

      // Por ahora retornamos JSON, pero se puede extender para generar PDF
      res.json({
        success: true,
        data: reportData,
        message: 'Reporte generado exitosamente'
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating graduates summary report:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de resumen de egresados',
      error: error.message
    });
  }
};

export default generateGraduatesSummaryReport;



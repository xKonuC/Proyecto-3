import pool from '../../../../../dbConnection.js';

const generateGraduatesByYearReport = async (req, res) => {
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

      // Obtener distribución de egresados por año
      const [graduatesByYear] = await connection.execute(`
        SELECT 
          u.entry as year,
          COUNT(*) as totalCount,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount,
          AVG(YEAR(CURDATE()) - u.entry) as averageAgeAtGraduation
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.entry IS NOT NULL ${dateFilter}
        GROUP BY u.entry
        ORDER BY u.entry DESC
      `);

      // Obtener tendencias por año
      const [yearTrends] = await connection.execute(`
        SELECT 
          u.entry as year,
          COUNT(*) as graduatesCount,
          COUNT(CASE WHEN u.workPlace IS NOT NULL AND u.workPlace != '' THEN 1 END) as employedCount,
          ROUND(
            (COUNT(CASE WHEN u.workPlace IS NOT NULL AND u.workPlace != '' THEN 1 END) / COUNT(*)) * 100, 2
          ) as employmentRate
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.entry IS NOT NULL ${dateFilter}
        GROUP BY u.entry
        ORDER BY u.entry DESC
      `);

      const reportData = {
        graduatesByYear: graduatesByYear,
        yearTrends: yearTrends,
        generatedAt: new Date().toISOString(),
        dateRange: dateRange || null
      };

      res.json({
        success: true,
        data: reportData,
        message: 'Reporte de egresados por año generado exitosamente'
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating graduates by year report:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de egresados por año',
      error: error.message
    });
  }
};

export default generateGraduatesByYearReport;



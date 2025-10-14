import pool from '../../../../../dbConnection.js';

const generateGraduatesBySpecializationReport = async (req, res) => {
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

      // Obtener distribución por especialización (si existe la tabla de especializaciones)
      const [graduatesBySpecialization] = await connection.execute(`
        SELECT 
          'General' as specialization,
          COUNT(*) as totalCount,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount,
          AVG(u.entry) as averageEntryYear
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 ${dateFilter}
        GROUP BY 'General'
      `);

      // Obtener distribución por lugar de trabajo
      const [graduatesByWorkPlace] = await connection.execute(`
        SELECT 
          u.workPlace,
          COUNT(*) as count,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.workPlace IS NOT NULL AND u.workPlace != '' ${dateFilter}
        GROUP BY u.workPlace
        ORDER BY count DESC
        LIMIT 10
      `);

      // Obtener distribución por cargo
      const [graduatesByJob] = await connection.execute(`
        SELECT 
          u.job,
          COUNT(*) as count,
          COUNT(CASE WHEN u.sex = 'M' THEN 1 END) as maleCount,
          COUNT(CASE WHEN u.sex = 'F' THEN 1 END) as femaleCount
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.job IS NOT NULL AND u.job != '' ${dateFilter}
        GROUP BY u.job
        ORDER BY count DESC
        LIMIT 10
      `);

      const reportData = {
        graduatesBySpecialization: graduatesBySpecialization,
        graduatesByWorkPlace: graduatesByWorkPlace,
        graduatesByJob: graduatesByJob,
        generatedAt: new Date().toISOString(),
        dateRange: dateRange || null
      };

      res.json({
        success: true,
        data: reportData,
        message: 'Reporte de egresados por especialización generado exitosamente'
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating graduates by specialization report:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de egresados por especialización',
      error: error.message
    });
  }
};

export default generateGraduatesBySpecializationReport;

import pool from '../../../../../dbConnection.js';

const getReportsSummary = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');

      // Obtener total de egresados
      const [graduatesCount] = await connection.execute(`
        SELECT COUNT(*) as total
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5
      `);

      // Obtener total de estudiantes
      const [studentsCount] = await connection.execute(`
        SELECT COUNT(*) as total
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 4
      `);

      // Obtener total de clasificaciones
      const [classificationsCount] = await connection.execute(`
        SELECT COUNT(*) as total
        FROM classification
      `);

      // Obtener egresados por año
      const [graduatesByYear] = await connection.execute(`
        SELECT 
          u.entry as year,
          COUNT(*) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.entry IS NOT NULL
        GROUP BY u.entry
        ORDER BY u.entry DESC
      `);

      // Obtener egresados por especialización (si existe la tabla)
      const [graduatesBySpecialization] = await connection.execute(`
        SELECT 
          'General' as specialization,
          COUNT(*) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5
        GROUP BY 'General'
      `);

      // Obtener egresados recientes
      const [recentGraduates] = await connection.execute(`
        SELECT 
          u.userID,
          u.rut,
          u.firstName,
          u.secondName,
          u.surname1,
          u.surname2,
          u.email,
          u.entry,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5
        ORDER BY u.userID DESC
        LIMIT 10
      `);

      res.json({
        success: true,
        data: {
          totalGraduates: graduatesCount[0].total,
          totalStudents: studentsCount[0].total,
          totalClassifications: classificationsCount[0].total,
          graduatesByYear: graduatesByYear,
          graduatesBySpecialization: graduatesBySpecialization,
          recentGraduates: recentGraduates
        }
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting reports summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el resumen de reportes',
      error: error.message
    });
  }
};

export default getReportsSummary;



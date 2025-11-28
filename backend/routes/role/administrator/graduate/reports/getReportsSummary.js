import posgradoPool from '../../../../../posgradoDbConnection.js';

const getReportsSummary = async (req, res) => {
  try {
    const connection = await posgradoPool.getConnection();

    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');

      // Obtener total de graduados
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

      /*/ Obtener ingresos por año
      const [graduatesByYear] = await connection.execute(`
        SELECT 
          u.entry as year,
          COUNT(*) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5 AND u.entry IS NOT NULL
        GROUP BY u.entry
        ORDER BY u.entry DESC
      `);*/

      // Obtener graduados por año
      const [graduatesByYear] = await connection.execute(`
        SELECT
            sht.titleYear as year,  -- Usamos la columna titleYear
            COUNT(DISTINCT u.userID) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        JOIN studentHasTitle sht ON u.userID = sht.userID  -- Conexión clave
        WHERE uhr.roleID = 5  -- Solo Graduados
        AND sht.titleYear IS NOT NULL
        GROUP BY year
        ORDER BY year DESC
      `);

      // Obtener graduados por especialización (si existe la tabla)
      const [graduatesBySpecialization] = await connection.execute(`
        SELECT 
          'General' as specialization,
          COUNT(*) as count
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE uhr.roleID = 5
        GROUP BY 'General'
      `);

      // Obtener graduados recientes
      const [recentGraduates] = await connection.execute(`
        SELECT 
          u.userID,
          u.rut,
          u.firstName,
          u.secondName,
          u.surname1,
          u.surname2,
          u.sex,
          u.email,
          u.entry,
          u.workPlace,
          u.job,
          MAX(sht.titleYear) AS graduationYear,
          CONCAT(
            u.firstName, ' ',
            IFNULL(u.secondName, ''), ' ',
            u.surname1, ' ',
            IFNULL(u.surname2, '')
          ) as fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        LEFT JOIN studentHasTitle sht ON u.userID = sht.userID
        WHERE uhr.roleID = 5
        GROUP BY
          u.userID,
          u.rut,
          u.firstName,
          u.secondName,
          u.surname1,
          u.surname2,
          u.sex,
          u.email,
          u.entry,
          u.workPlace,
          u.job
        ORDER BY u.userID DESC
        LIMIT 20
      `);

      res.json({
        success: true,
        data: {
          totalGraduates: graduatesCount[0].total,
          totalStudents: studentsCount[0].total,
          totalClassifications: classificationsCount[0].total,
          graduatesByYear: graduatesByYear,
          graduatesBySpecialization: graduatesBySpecialization,
          recentGraduates: recentGraduates,
        },
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting reports summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener el resumen de reportes',
      error: error.message,
    });
  }
};

export default getReportsSummary;

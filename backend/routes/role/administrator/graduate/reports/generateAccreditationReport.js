import posgradoPool from '../../../../../posgradoDbConnection.js';

const generateAccreditationReport = async (req, res) => {
  try {
    const connection = await posgradoPool.getConnection();

    try {
      // Configuración UTF-8
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');

      // Últimos 5 años incluyendo el actual
      const currentYear = new Date().getFullYear();
      const fromYear = currentYear - 4;

      const [graduates] = await connection.execute(
        `
        SELECT
          u.userID,
          u.rut,
          u.sex,
          u.workPlace,
          u.job,
          sht.titleYear AS graduationYear
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        INNER JOIN studentHasTitle sht ON u.userID = sht.userID
        WHERE uhr.roleID = 5               
          AND sht.titleYear IS NOT NULL
          AND sht.titleYear BETWEEN ? AND ?
        ORDER BY sht.titleYear DESC, u.surname1, u.firstName
      `,
        [fromYear, currentYear],
      );

      const reportData = {
        graduates,
        yearRange: {
          fromYear,
          toYear: currentYear,
        },
        generatedAt: new Date().toISOString(),
      };

      res.json({
        success: true,
        data: reportData,
        message: 'Reporte de acreditación generado exitosamente',
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error generating accreditation report:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar el reporte de acreditación',
      error: error.message,
    });
  }
};

export default generateAccreditationReport;

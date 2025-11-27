import posgradoPool from '../../../../../posgradoDbConnection.js';
import authPool from '../../../../../authDbConnection.js';

const getGraduates = async (req, res) => {
  try {
    const connection = await posgradoPool.getConnection();
    const authConnection = await authPool.getConnection();

    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');
      
      // Obtener graduados
      const [graduates] = await connection.execute(`
        SELECT DISTINCT
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
          u.articulation,
          u.\`group\` as \`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE u.userID IS NOT NULL 
        AND uhr.roleID = 5  -- Rol Graduado (5)
        ORDER BY u.firstName, u.surname1
      `);

      // Procesar graduados para mantener consistencia con la estructura de estudiantes
      const processedGraduates = await Promise.all(
        graduates.map(async (graduate) => {
          // Obtener roles reales del usuario
          const [roles] = await connection.execute(`
            SELECT r.name as roleName, r.name as roleDescription
            FROM userHasRole uhr
            JOIN role r ON uhr.roleID = r.roleID
            WHERE uhr.userID = ?
          `, [graduate.userID]);

          return {
            ...graduate,
            roles: roles,
            status: 'Graduado',
            classification: 'Graduado'
          };
        })
      );

      res.json({
        success: true,
        data: processedGraduates,
        total: processedGraduates.length
      });

    } finally {
      connection.release();
      authConnection.release();
    }
  } catch (error) {
    console.error('Error getting graduates:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la lista de graduados',
      error: error.message
    });
  }
};

export default getGraduates;

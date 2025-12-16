import posgradoPool from '../../../../../posgradoDbConnection.js';

const getGraduates = async (req, res) => {
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

      // ✅ 1) Obtener graduados + año de graduación (MAX titleYear)
      const [graduates] = await connection.execute(`
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
          u.phoneWork,
          u.entry,
          u.workPlace,
          u.job,
          u.articulation,
          u.\`group\` as \`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          MAX(sht.titleYear) AS graduationYear,
          CONCAT(
            u.firstName, ' ',
            IFNULL(u.secondName, ''), ' ',
            u.surname1, ' ',
            IFNULL(u.surname2, '')
          ) AS fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        LEFT JOIN studentHasTitle sht ON u.userID = sht.userID
        WHERE u.userID IS NOT NULL
          AND uhr.roleID = 5
        GROUP BY
          u.userID,
          u.rut,
          u.firstName,
          u.secondName,
          u.surname1,
          u.surname2,
          u.email,
          u.personalEmail,
          u.phone,
          u.phoneWork,
          u.entry,
          u.workPlace,
          u.job,
          u.articulation,
          u.\`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address
        ORDER BY u.firstName, u.surname1
      `);

      // ✅ 2) Traer roles de TODOS en una sola query
      const userIds = graduates.map(g => g.userID);
      let rolesByUserId = {};

      if (userIds.length > 0) {
        const placeholders = userIds.map(() => '?').join(',');

        const [rolesRows] = await connection.execute(
          `
          SELECT
            uhr.userID,
            r.name as roleName,
            r.name as roleDescription
          FROM userHasRole uhr
          JOIN role r ON uhr.roleID = r.roleID
          WHERE uhr.userID IN (${placeholders})
          `,
          userIds
        );

        // Agrupar roles por userID
        for (const row of rolesRows) {
          if (!rolesByUserId[row.userID]) rolesByUserId[row.userID] = [];
          rolesByUserId[row.userID].push({
            roleName: row.roleName,
            roleDescription: row.roleDescription,
          });
        }
      }

      // ✅ 3) Estructura final igual a la tuya, pero con graduationYear y phoneWork
      const processedGraduates = graduates.map((graduate) => ({
        ...graduate,
        roles: rolesByUserId[graduate.userID] || [],
        status: 'Graduado',
        classification: 'Graduado',
        graduationYear: graduate.graduationYear || null, // deja null si no hay
      }));

      res.json({
        success: true,
        data: processedGraduates,
        total: processedGraduates.length,
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting graduates:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la lista de graduados',
      error: error.message,
    });
  }
};

export default getGraduates;

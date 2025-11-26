import posgradoPool from '../../../../../posgradoDbConnection.js';
import authPool from '../../../../../authDbConnection.js';

const getStudents = async (req, res) => {
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
      
<<<<<<< Updated upstream
      // Obtener estudiantes y egresados con información completa
=======
      // Obtener estudiantes y graduados con información completa
>>>>>>> Stashed changes
      const [students] = await connection.execute(`
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
          u.articulation,
          u.\`group\` as \`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM user u
<<<<<<< Updated upstream
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE u.userID IS NOT NULL 
        AND uhr.roleID IN (4, 5)  -- Roles Estudiante (4) y Egresado (5)
=======
        WHERE EXISTS (
          SELECT 1 
          FROM userHasRole uhr 
          WHERE uhr.userID = u.userID 
          AND uhr.roleID IN (4, 5)
        )
>>>>>>> Stashed changes
        ORDER BY u.firstName, u.surname1
      `);

      // Procesar estudiantes y egresados
      const studentsWithRoles = await Promise.all(
        students.map(async (student) => {
          // Obtener roles reales del usuario desde la base de datos
          const [roles] = await connection.execute(`
            SELECT r.roleID, r.name as roleName
            FROM userHasRole uhr
            JOIN role r ON uhr.roleID = r.roleID
            WHERE uhr.userID = ?
            ORDER BY r.roleID
          `, [student.userID]);

<<<<<<< Updated upstream
          // Determinar clasificación basada en los roles
          const isGraduate = roles.some(role => role.roleName === 'Egresado');
          const isStudent = roles.some(role => role.roleName === 'Estudiante');
          
          let classification = 'Sin clasificar';
          if (isGraduate) classification = 'Egresado';
          else if (isStudent) classification = 'Estudiante';
          
          console.log(`User ${student.userID}: roles=${JSON.stringify(roles.map(r => r.roleName))}, classification=${classification}`);
=======
          // Determinar clasificación basada SOLO en los roles 4 y 5
          const studentRoles = roles.filter(r => r.roleID === 4 || r.roleID === 5);
          
          let classification = 'Sin clasificar';
          if (studentRoles.length > 0) {
            // Si tiene rol 5 (Graduado), mostrar Graduado
            if (studentRoles.some(role => role.roleID === 5)) {
              classification = 'Graduado';
            } 
            // Si solo tiene rol 4 (Estudiante), mostrar Estudiante
            else if (studentRoles.some(role => role.roleID === 4)) {
              classification = 'Estudiante';
            }
          }
>>>>>>> Stashed changes

          return {
            ...student,
            roles: roles.map(r => ({ roleName: r.roleName, roleDescription: r.roleName })),
            status: roles.length > 0 ? 'Activo' : 'Inactivo',
            classification: classification
          };
        })
      );

      res.json({
        success: true,
        data: studentsWithRoles,
        total: studentsWithRoles.length
      });

    } finally {
      connection.release();
      authConnection.release();
    }
  } catch (error) {
    console.error('Error getting students:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la lista de estudiantes',
      error: error.message
    });
  }
};

export default getStudents;

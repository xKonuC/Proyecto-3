import pool from '../../../../../dbConnection.js';
import authPool from '../../../../../authDbConnection.js';

const getStudents = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const authConnection = await authPool.getConnection();

    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      await connection.execute('SET sql_mode = ""');
      
      // Obtener estudiantes y egresados con información completa
      const [students] = await connection.execute(`
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
          u.\`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM user u
        INNER JOIN userHasRole uhr ON u.userID = uhr.userID
        WHERE u.userID IS NOT NULL 
        AND uhr.roleID IN (4, 5)  -- Roles Estudiante (4) y Egresado (5)
        ORDER BY u.firstName, u.surname1
      `);

      // Procesar estudiantes y egresados
      const studentsWithRoles = await Promise.all(
        students.map(async (student) => {
          // Obtener roles reales del usuario
          const [roles] = await connection.execute(`
            SELECT r.name as roleName, r.name as roleDescription
            FROM userHasRole uhr
            JOIN role r ON uhr.roleID = r.roleID
            WHERE uhr.userID = ?
          `, [student.userID]);

          // Determinar clasificación basada en los roles
          const isGraduate = roles.some(role => role.roleName === 'Egresado');
          const isStudent = roles.some(role => role.roleName === 'Estudiante');
          
          let classification = 'Sin clasificar';
          if (isGraduate) classification = 'Egresado';
          else if (isStudent) classification = 'Estudiante';

          return {
            ...student,
            roles: roles,
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

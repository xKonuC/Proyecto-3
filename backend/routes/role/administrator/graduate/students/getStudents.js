import pool from '../../../../../dbConnection.js';
import authPool from '../../../../../authDbConnection.js';

const getStudents = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const authConnection = await authPool.getConnection();

    try {
      // Obtener todos los estudiantes con información completa
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
          u.\`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          ua.name as fullName,
          ua.provider,
          ua.password
        FROM user u
        LEFT JOIN authdb.userAccount ua ON u.userID = ua.id
        WHERE u.userID IS NOT NULL
        ORDER BY u.firstName, u.surname1
      `);

      // Obtener información de roles para cada estudiante
      const studentsWithRoles = await Promise.all(
        students.map(async (student) => {
          const [roles] = await connection.execute(`
            SELECT r.name as roleName, r.name as roleDescription
            FROM userHasRole uhr
            JOIN role r ON uhr.roleID = r.roleID
            WHERE uhr.userID = ?
          `, [student.userID]);

          return {
            ...student,
            roles: roles,
            fullName: `${student.firstName} ${student.secondName || ''} ${student.surname1} ${student.surname2 || ''}`.trim(),
            status: roles.length > 0 ? 'Activo' : 'Inactivo',
            classification: roles.some(role => role.roleName === 'Estudiante') ? 'En Proceso' : 'Sin clasificar'
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

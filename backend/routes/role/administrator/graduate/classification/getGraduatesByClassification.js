import pool from '../../../../../dbConnection.js';

const getGraduatesByClassification = async (req, res) => {
  try {
    const { classificationId } = req.params;
    
    if (!classificationId) {
      return res.status(400).json({
        success: false,
        message: 'ID de clasificación es requerido'
      });
    }

    const connection = await pool.getConnection();
    
    try {
      // Obtener información de la clasificación
      const [classification] = await connection.execute(`
        SELECT 
          c.classificationID,
          c.name as classificationName,
          c.description,
          c.criteria,
          c.createdAt,
          c.updatedAt
        FROM classification c
        WHERE c.classificationID = ?
      `, [classificationId]);


      if (classification.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Clasificación no encontrada'
        });
      }

      // Obtener egresados de esta clasificación
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
          u.entry,
          u.workPlace,
          u.phoneWork,
          u.job,
          u.articulation,
          u.\`group\`,
          u.sex,
          u.civilStatus,
          u.birthday,
          u.address,
          ug.classifiedAt,
          ug.classifiedBy,
          CONCAT(u.firstName, ' ', IFNULL(u.secondName, ''), ' ', u.surname1, ' ', IFNULL(u.surname2, '')) as fullName
        FROM userHasClassification ug
        JOIN user u ON ug.userID = u.userID
        WHERE ug.classificationID = ?
        ORDER BY u.firstName, u.surname1
      `, [classificationId]);

      // Obtener roles de cada egresado
      const graduatesWithRoles = await Promise.all(
        graduates.map(async (graduate) => {
          const [roles] = await connection.execute(`
            SELECT r.name as roleName, r.name as roleDescription
            FROM userHasRole uhr
            JOIN role r ON uhr.roleID = r.roleID
            WHERE uhr.userID = ?
          `, [graduate.userID]);

          return {
            ...graduate,
            roles: roles
          };
        })
      );

      res.json({
        success: true,
        data: {
          classification: classification[0],
          graduates: graduatesWithRoles
        }
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting graduates by classification:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los egresados de la clasificación',
      error: error.message
    });
  }
};

export default getGraduatesByClassification;

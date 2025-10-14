import pool from '../../../../../dbConnection.js';

const getClassifications = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Obtener todas las clasificaciones con información de egresados
      const [classifications] = await connection.execute(`
        SELECT 
          c.classificationID,
          c.name as classificationName,
          c.description,
          c.criteria,
          c.createdAt,
          c.updatedAt,
          COUNT(ug.userID) as graduateCount
        FROM classification c
        LEFT JOIN userHasClassification ug ON c.classificationID = ug.classificationID
        GROUP BY c.classificationID, c.name, c.description, c.criteria, c.createdAt, c.updatedAt
        ORDER BY c.createdAt DESC
      `);

      // Para cada clasificación, obtener los egresados asociados
      const classificationsWithGraduates = await Promise.all(
        classifications.map(async (classification) => {
          const [graduates] = await connection.execute(`
            SELECT 
              u.userID,
              u.rut,
              u.firstName,
              u.secondName,
              u.surname1,
              u.surname2,
              u.email,
              u.entry,
              u.workPlace,
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
          `, [classification.classificationID]);

          return {
            ...classification,
            graduates: graduates
          };
        })
      );

      res.json({
        success: true,
        data: classificationsWithGraduates
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting classifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las clasificaciones',
      error: error.message
    });
  }
};

export default getClassifications;

import pool from '../../../../../dbConnection.js';

const getClassificationCriteria = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      // Obtener criterios de clasificación disponibles
      const [specializations] = await connection.execute(`
        SELECT DISTINCT s.name as specializationName, s.specializationID
        FROM specialization s
        JOIN studentHasSpecialization shs ON s.specializationID = shs.specializationID
        ORDER BY s.name
      `);

      const [entryYears] = await connection.execute(`
        SELECT DISTINCT u.entry as year
        FROM user u
        WHERE u.entry IS NOT NULL
        ORDER BY u.entry DESC
      `);

      const [groups] = await connection.execute(`
        SELECT DISTINCT u.\`group\` as groupName
        FROM user u
        WHERE u.\`group\` IS NOT NULL
        ORDER BY u.\`group\`
      `);

      const [articulations] = await connection.execute(`
        SELECT DISTINCT u.articulation as articulationType
        FROM user u
        WHERE u.articulation IS NOT NULL
        ORDER BY u.articulation
      `);

      const [workPlaces] = await connection.execute(`
        SELECT DISTINCT u.workPlace
        FROM user u
        WHERE u.workPlace IS NOT NULL AND u.workPlace != ''
        ORDER BY u.workPlace
      `);

      const [jobs] = await connection.execute(`
        SELECT DISTINCT u.job
        FROM user u
        WHERE u.job IS NOT NULL AND u.job != ''
        ORDER BY u.job
      `);

      res.json({
        success: true,
        data: {
          specializations: specializations,
          entryYears: entryYears,
          groups: groups,
          articulations: articulations,
          workPlaces: workPlaces,
          jobs: jobs
        }
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting classification criteria:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los criterios de clasificación',
      error: error.message
    });
  }
};

export default getClassificationCriteria;

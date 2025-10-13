import pool from '../../../../../dbConnection.js';

const getRoles = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    try {
      const [roles] = await connection.execute(
        'SELECT roleID, name FROM role ORDER BY name'
      );

      res.json({
        success: true,
        data: roles
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error getting roles:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los roles',
      error: error.message
    });
  }
};

export default getRoles;

import pool from '../../../../../dbConnection.js';

const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Nombre es requerido'
      });
    }

    const connection = await pool.getConnection();
    
    try {
      // Verificar si el rol ya existe
      const [existingRole] = await connection.execute(
        'SELECT roleID FROM role WHERE name = ?',
        [name]
      );

      if (existingRole.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'El rol ya existe'
        });
      }

      // Crear el nuevo rol
      const [result] = await connection.execute(
        'INSERT INTO role (name) VALUES (?)',
        [name]
      );

      res.json({
        success: true,
        message: 'Rol creado exitosamente',
        data: {
          roleID: result.insertId,
          name
        }
      });

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el rol',
      error: error.message
    });
  }
};

export default createRole;

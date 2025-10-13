import pool from '../../../dbConnection.js';

// Eliminar ahora es degree
class SelectDegree {
  async selectUser() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}
// ✅
class SelectDegree_SupaBase extends SelectDegree {
  async selectDegree() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from degree;
    `);
    connection.release();
    return { result };
  }
}

export { SelectDegree_SupaBase as SelectDegree };

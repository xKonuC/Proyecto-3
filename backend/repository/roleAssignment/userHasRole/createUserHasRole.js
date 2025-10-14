import pool from '../../../dbConnection.js';

class CreateUserHasRole {
  async createUserHasRole(userID, roleID) {
    const connection = await pool.getConnection();
    
    try {
      console.log(`🔍 Intentando crear userHasRole: userID=${userID}, roleID=${roleID}`);
      
      // Verificar que el usuario existe
      const [userCheck] = await connection.execute('SELECT userID FROM user WHERE userID = ?', [userID]);
      if (userCheck.length === 0) {
        throw new Error(`Usuario con ID ${userID} no existe`);
      }
      
      // Verificar que el rol existe
      const [roleCheck] = await connection.execute('SELECT roleID FROM role WHERE roleID = ?', [roleID]);
      if (roleCheck.length === 0) {
        throw new Error(`Rol con ID ${roleID} no existe`);
      }
      
      const [result] = await connection.execute('insert into userHasRole (userID, roleID) values (?,?);', [userID, roleID]);
      console.log(`✅ userHasRole creado exitosamente: userID=${userID}, roleID=${roleID}`);
      return { result };
    } catch (error) {
      console.error(`❌ Error creando userHasRole: userID=${userID}, roleID=${roleID}`, error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

export { CreateUserHasRole };

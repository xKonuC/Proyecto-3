import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUser {
  async selectUser() {
    const connection = await posgradoPool.getConnection();
    
    try {
      // Configurar UTF-8 en la conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
      await connection.execute('SET CHARACTER SET utf8mb4');
      await connection.execute('SET character_set_client = utf8mb4');
      await connection.execute('SET character_set_connection = utf8mb4');
      await connection.execute('SET character_set_results = utf8mb4');
      
      const [response] = await connection.execute('SELECT * FROM user;');
      return { response };
    } finally {
      connection.release();
    }
  }
}

export { SelectUser };

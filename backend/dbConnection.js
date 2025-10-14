import mysql from 'mysql2/promise.js';
import dbConfig from './dbConfig.js';

const pool = mysql.createPool({
  ...dbConfig,
  charset: 'utf8mb4'
});

pool.getConnection(async (err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }  
    
    // Configurar UTF-8 en cada conexión
    try {
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
    } catch (error) {
      console.error('Error setting charset:', error);
    }
    
    const query = 'SELECT 1 + 1 AS result';  
    connection.query(query, (error, results) => {
      connection.release();  
      if (error) {
        console.error('Error executing query:', error);
        return;
      }
    });
});


export default pool;

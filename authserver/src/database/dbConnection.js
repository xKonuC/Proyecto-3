import dbConfig from "./dbConfig.js";
import mysql from "mysql2/promise.js";

const pool = mysql.createPool(dbConfig);

pool.getConnection(async (err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }  
    try {
      // Configurar UTF-8 en cada conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
    } catch (error) {
      console.error('Error setting charset:', error);
    }
    connection.release();
});
  

export default pool;
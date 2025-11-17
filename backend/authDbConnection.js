import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';

dotenv.config();

const authDbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root123!',
  database: 'authdb', // Usar authdb para autenticación
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
  multipleStatements: false,
  dateStrings: false,
  supportBigNumbers: true,
  bigNumberStrings: true
};

const authPool = mysql.createPool(authDbConfig);

authPool.getConnection(async (err, connection) => {
    if (err) {
      console.error('Error connecting to the auth database:', err);
      return;
    }  
    try {
      // Configurar UTF-8 en cada conexión
      await connection.execute('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
    } catch (error) {
      console.error('Error setting charset for auth database:', error);
    }
    connection.release();
});

export default authPool;
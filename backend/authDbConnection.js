import mysql from 'mysql2/promise.js';
import dotenv from 'dotenv';

dotenv.config();

const authDbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Root123!',
  database: 'authdb',
  port: 3307,
  charset: 'utf8mb4',
};

const authPool = mysql.createPool(authDbConfig);

authPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the auth database:', err);
      return;
    }  
    const query = 'SELECT 1 + 1 AS result';  
    connection.query(query, (error, results) => {
      connection.release();  
      if (error) {
        console.error('Error executing query on auth database:', error);
        return;
      }
    });
});

export default authPool;

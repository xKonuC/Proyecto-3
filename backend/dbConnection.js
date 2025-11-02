import mysql from 'mysql2/promise.js';
import dbConfig from './dbConfig.js';

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
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

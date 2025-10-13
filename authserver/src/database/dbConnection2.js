import dbConfig2 from "./dbConfig2.js";
import mysql from "mysql2/promise.js";

const pool2 = mysql.createPool(dbConfig2);

pool2.getConnection((err, connection) => {
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

export default pool2;
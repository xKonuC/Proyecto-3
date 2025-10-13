import pool from '../../dbConnection.js';

class SaveUserData {
  async saveUserData(dataBase, id, email) {
    try {
      const connection = await pool.getConnection();
      try {
        // Insert user data into the posgrado database with default values
        await connection.execute(
          'INSERT INTO user (userID, rut, firstName, surname1, sex, birthday, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [id, '00000000-0', 'Usuario', 'Temporal', 'M', '1990-01-01', email]
        );
      } finally {
        connection.release();
      }
    } catch (error) {
      console.log('Warning: Could not save user data to operational database:', error.message);
      // Continue without failing - the user can still be created in auth database
    }
  }
}

export { SaveUserData };

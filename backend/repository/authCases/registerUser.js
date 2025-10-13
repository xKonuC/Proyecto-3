import bcrypt from 'bcrypt';
import authPool from '../../authDbConnection.js';

class RegisterUser {
  async registerUser(dataBase, email, password) {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert user into auth database
    const connection = await authPool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO userAccount (name, email, provider, password) VALUES (?, ?, ?, ?)',
        [email, email, 'Email', hashedPassword]
      );
      
      return {
        user: {
          id: result.insertId,
          email: email
        }
      };
    } finally {
      connection.release();
    }
  }
}

export { RegisterUser };

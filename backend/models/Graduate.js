import posgradoPool from '../posgradoDbConnection.js';

class GraduateModel {
  static async findAll() {
    const query = 'SELECT * FROM graduate';
    const [rows] = await posgradoPool.query(query);
    return rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM graduate WHERE graduateID = ?';
    const [rows] = await posgradoPool.query(query, [id]);
    return rows[0];
  }

  static async findByUserId(userId, connection = null) {
    const query = 'SELECT * FROM graduate WHERE userID = ?';
    const db = connection || posgradoPool;
    const [rows] = await db.query(query, [userId]);
    return rows[0];
  }

  static async create(data, connection = null) {
    const {
      userID, rut, firstName, secondName, surname1, surname2,
      email, workPlace, job, entryYear, graduationYear
    } = data;

    const query = `
      INSERT INTO graduate 
      (userID, rut, firstName, secondName, surname1, surname2, email, workPlace, job, entryYear, graduationYear)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const db = connection || posgradoPool;
    const [result] = await db.query(query, [
      userID, rut, firstName, secondName, surname1, surname2,
      email, workPlace, job, entryYear, graduationYear
    ]);

    return result.insertId;
  }

  static async update(id, data) {
    // Filter out undefined/null/empty values to only update provided fields
    const fields = [];
    const values = [];

    // Reserved words in MySQL that need backtick escaping
    const reservedWords = ['group', 'order', 'select', 'where', 'from', 'table'];

    // Fields that should be integers or NULL
    const integerFields = ['group', 'articulation', 'graduationYear', 'entryYear'];
    
    // Fields that should be dates or NULL
    const dateFields = ['birthday'];

    // Map frontend field names to database column names
    const fieldMapping = {
      'jobTitle': 'job',
      'entry': 'entryYear'
      // Add more mappings as needed
    };

    // Valid columns in the graduate table (whitelist)
    const validColumns = [
      'rut', 'firstName', 'secondName', 'surname1', 'surname2',
      'email', 'sex', 'address', 'workPlace', 'job',
      'entryYear', 'graduationYear', 'createdAt', 'updatedAt',
      'personalEmail', 'phone', 'phoneWork', 'civilStatus', 'birthday',
      'group', 'articulation'
    ];

    Object.keys(data).forEach(key => {
      // Skip these fields
      if (key === 'graduateID' || key === 'userID' || key === 'createdAt' || key === 'updatedAt') {
        return;
      }

      // Map field name if needed
      const mappedKey = fieldMapping[key] || key;
      
      if (key !== mappedKey) {
        console.log(`Field mapping applied: ${key} → ${mappedKey}`);
      }

      // Skip fields that don't exist in the graduate table
      if (!validColumns.includes(mappedKey)) {
        console.warn(`Skipping invalid field for graduate table: ${key} (mapped to: ${mappedKey})`);
        return;
      }

      const value = data[key];

      // Skip undefined values
      if (value === undefined) {
        return;
      }

      // Skip empty strings
      if (value === '') {
        return;
      }

      // Handle integer fields
      if (integerFields.includes(mappedKey)) {
        if (value === null || value === 'null') {
          const fieldName = reservedWords.includes(mappedKey) ? `\`${mappedKey}\`` : mappedKey;
          fields.push(`${fieldName} = ?`);
          values.push(null);
        } else {
          const parsedValue = parseInt(value, 10);
          if (!isNaN(parsedValue)) {
            const fieldName = reservedWords.includes(mappedKey) ? `\`${mappedKey}\`` : mappedKey;
            fields.push(`${fieldName} = ?`);
            values.push(parsedValue);
          }
        }
        return;
      }

      // Handle date fields
      if (dateFields.includes(mappedKey)) {
        if (value === null || value === 'null') {
          fields.push(`${mappedKey} = ?`);
          values.push(null);
        } else if (value) {
          fields.push(`${mappedKey} = ?`);
          values.push(value);
        }
        return;
      }

      // Handle regular fields (strings, etc.)
      if (value !== null) {
        const fieldName = reservedWords.includes(mappedKey) ? `\`${mappedKey}\`` : mappedKey;
        fields.push(`${fieldName} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return 0;

    values.push(id);
    const query = `UPDATE graduate SET ${fields.join(', ')} WHERE graduateID = ?`;
    
    const [result] = await posgradoPool.query(query, values);
    return result.affectedRows;
  }

  static async delete(id, connection = null) {
    const query = 'DELETE FROM graduate WHERE graduateID = ?';
    const db = connection || posgradoPool;
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  }
}

export default GraduateModel;
	

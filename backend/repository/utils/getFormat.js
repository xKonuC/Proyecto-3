import posgradoPool from '../../posgradoDbConnection.js';

class GetFormat {
  async getFormat() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}

class GetFormat_SupaBase extends GetFormat {
  async getFormat(name) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(
      `select * from format
      where name = ?;`,
      [name],
    );
    connection.release();
    return result[0];
  }
}

export { GetFormat_SupaBase as GetFormat };

import posgradoPool from '../../../posgradoDbConnection.js';

class SelectTitleHasUniversity {
  async selectTitleHasUniversity() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select titleHasUniversity.*, area.name as areaName  from 
    titleHasUniversity
    left join area
    on titleHasUniversity.areaID = area.areaID;
    `);
    connection.release();
    return { result };
  }
}

export { SelectTitleHasUniversity };

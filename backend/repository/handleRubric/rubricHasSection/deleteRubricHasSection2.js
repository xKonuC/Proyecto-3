import posgradoPool from '../../../posgradoDbConnection.js';

/*  En este caso es para eliminar mediante el rubricID unicamente que por efecto
    cascada eliminara todo lo relacionado(util para volver a construir con una nueva plantilla)
*/
class DeleteRubricHasSection {
  async deleteRubricHasSection(rubricID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from rubricHasSection
    where rubricID = ?;
    `, [rubricID]);
    connection.release();
    return { result };
  }
}

export { DeleteRubricHasSection };

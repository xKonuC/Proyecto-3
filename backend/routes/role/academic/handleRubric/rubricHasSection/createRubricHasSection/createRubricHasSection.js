import { CreateRubricHasSection } from '../../../../../../repository/handleRubric/rubricHasSection/createRubricHasSection.js';

const createRubricHasSection = async (req, res) => {
  const { dataArray, rubricID } = req.body;
  const createRubricHasSectionInstance = new CreateRubricHasSection();
  const insertedIds = []; // Array para almacenar los insertId

  try {
    // Ejecutar las operaciones de inserción en paralelo
    const createPromises = dataArray.map(async (data) => {
      const result= await createRubricHasSectionInstance.createRubricHasSection(rubricID, data);
      if(result){
        insertedIds.push(result); // Almacena el insertId en el array
      }
    });
    // Esperar a que todas las operaciones de inserción se completen
    await Promise.all(createPromises);
    // Enviar los insertId en la respuesta, con esto poder crear rubricHasQuestion
    res.status(200).json(insertedIds);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default createRubricHasSection;

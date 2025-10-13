import { CreateTemplateHasSection } from '../../../../../../repository/handleRubric/templateHasSection/createTemplateHasSection.js';

const createTemplateHasSection = async (req, res) => {
  const { dataArray, templateID } = req.body;
  const createTemplateHasSectionInstance = new CreateTemplateHasSection();
  const insertedIds = []; // Array para almacenar los insertId

  try {
    // Ejecutar las operaciones de inserción en paralelo
    const createPromises = dataArray.map(async (data) => {
      const { result } = await createTemplateHasSectionInstance.createTemplateHasSection(templateID, data);
      insertedIds.push(result.insertId); // Almacena el insertId en el array
    });

    // Esperar a que todas las operaciones de inserción se completen
    await Promise.all(createPromises);

    // Enviar los insertId en la respuesta, con esto poder crear templateHasQuestion
    res.status(200).json(insertedIds);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default createTemplateHasSection;

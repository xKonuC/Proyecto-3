import { CreateRubric } from '../../../../../../repository/handleRubric/rubric/createRubric.js';

const createRubric = async (req, res, next) => {
  const { name, description, templateID } = req.body;
  const createRubricInstance = new CreateRubric();
  try {
    req.body.rubricID = await createRubricInstance.createRubric(name, description, templateID);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createRubric;

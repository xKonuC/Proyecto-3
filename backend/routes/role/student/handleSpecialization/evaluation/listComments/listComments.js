import { SelectPreprojectEvaluator } from '../../../../../../repository/handleSpecialization/preprojectEvaluator/selectPreprojectEvaluator.js';

const listComments = async (req, res) => {
  const { evaluationID, evaluatorCategoryID } = req.body;
  const selectPreprojectEvaluatorInstance = new SelectPreprojectEvaluator();
  try {
    const data = await selectPreprojectEvaluatorInstance.selectPreprojectEvaluator(evaluationID, evaluatorCategoryID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listComments;

import { SelectEvaluationType } from '../../../../../../repository/handleSpecialization/evaluationType/selectEvaluationType.js';

const listEvaluationType = async (req, res) => {
  const selectEvaluationTypeInstance = new SelectEvaluationType();
  try {
    const data = await selectEvaluationTypeInstance.selectEvaluationType();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listEvaluationType;

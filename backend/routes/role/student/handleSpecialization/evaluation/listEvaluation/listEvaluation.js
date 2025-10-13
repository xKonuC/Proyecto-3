import { GetEvaluation } from '../../../../../../repository/handleSpecialization/evaluation/getEvaluation.js';

const listEvaluation = async (req, res) => {
  const {
    studentHasSemesterID, evaluationTypeID,
  } = req.body;
  const getEvaluationInstance = new GetEvaluation();
  try {
    const data = await getEvaluationInstance.getEvaluation(studentHasSemesterID, evaluationTypeID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listEvaluation;

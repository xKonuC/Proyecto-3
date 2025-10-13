import { UpdateRubricID } from '../../../../../../repository/handleSpecialization/evaluation/updateRubricID.js';

const updateRubricID = async (req, res, next) => {
  const {
    evaluationID, rubricID,
  } = req.body;
  const updateRubricIDInstance = new UpdateRubricID();
  try {
    await updateRubricIDInstance.updateRubricID(evaluationID, rubricID);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateRubricID;

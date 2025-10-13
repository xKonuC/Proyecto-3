import { GetRubricDataByCategory } from '../../../../../../repository/handleRubric/overview/getRubricDataByCategory.js';

const listEvaluationRubric = async (req, res) => {
  const {
    rubricID, evaluatorCategoryID, studentHasSemesterID, evaluationTypeID, rubricInfo, evaluationID,
  } = req.body;
  const getRubricDataByCategoryInstance = new GetRubricDataByCategory();
  try {
    const rubric = await getRubricDataByCategoryInstance.getRubricDataByCategory(rubricID, evaluatorCategoryID, studentHasSemesterID, evaluationID, evaluationTypeID);
    res.status(200).json({ rubric, rubricInfo });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listEvaluationRubric;

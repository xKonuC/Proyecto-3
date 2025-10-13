import { SelectRubricOverview } from '../../../../../../repository/handleRubric/overview/selectRubricOverview.js';
import { SelectUserByUserID } from '../../../../../../repository/roleAssignment/user/selectUserByUserID.js';

const listRubricOverview = async (req, res) => {
  const {
    rubricID, evaluatorID, userID, evaluationTypeID, studentID, fullNameEvaluator,
  } = req.body;
  const selectRubricOverviewInstance = new SelectRubricOverview();
  const selectUserByUserIDInstance = new SelectUserByUserID();
  try {
    const rubric = await selectRubricOverviewInstance.selectRubricOverview(rubricID, evaluatorID, userID, evaluationTypeID);
    const info = await selectUserByUserIDInstance.selectUserByUserID(studentID);
    res.status(200).json({
      rubric,
      rubricInfo: {
        fullNameEvaluator, entry: info.entry, group: info.group, fullName: `${info.firstName} ${info.secondName} ${info.surname1} ${info.surname2}`,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listRubricOverview;

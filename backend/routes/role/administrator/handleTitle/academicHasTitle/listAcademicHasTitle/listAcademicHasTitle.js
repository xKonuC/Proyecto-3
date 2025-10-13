import { SelectAcademicHasTitle } from '../../../../../../repository/handleTitle/academicHasTitle/selectAcademicHasTitle.js';

const listAcademicHasTitle = async (req, res) => {
  const { userID } = req.body;
  const selectAcademicHasTitleInstance = new SelectAcademicHasTitle();
  try {
    const data = await selectAcademicHasTitleInstance.selectAcademicHasTitle(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listAcademicHasTitle;

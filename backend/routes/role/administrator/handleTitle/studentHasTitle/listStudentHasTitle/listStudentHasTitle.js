import { SelectStudentHasTitle } from '../../../../../../repository/handleTitle/studentHasTitle/selectStudentHasTitle.js';

const listStudentHasTitle = async (req, res) => {
  const { userID } = req.body;
  const selectStudentHasTitleInstance = new SelectStudentHasTitle();
  try {
    const data = await selectStudentHasTitleInstance.selectStudentHasTitle(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listStudentHasTitle;

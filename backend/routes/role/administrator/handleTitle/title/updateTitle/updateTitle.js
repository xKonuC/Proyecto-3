import { UpdateTitle } from '../../../../../../repository/handleTitle/title/updateTitle.js';

const updateTitle = async (req, res) => {
  const {
    titleID, name, degreeID, universityID, areaID,
  } = req.body;
  const updateTitleInstance = new UpdateTitle();
  try {
    await updateTitleInstance.updateTitle(titleID, name, degreeID, universityID, areaID);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateTitle;

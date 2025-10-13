import { CreateTitle } from '../../../../../../repository/handleTitle/title/createTitle.js';

const createTitle = async (req, res) => {
  const {
    name, degreeID, universityID, areaID,
  } = req.body;
  const createTitleInstance = new CreateTitle();
  try {
    await createTitleInstance.createTitle(name, degreeID, universityID, areaID);
    res.status(200).json({ verificationMessage: 'El título fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createTitle;

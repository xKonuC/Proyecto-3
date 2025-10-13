import { DeleteTitle } from '../../../../../../repository/handleTitle/title/deleteTitle.js';

const deleteTitle = async (req, res) => {
  const { titleIDs } = req.body;
  const deleteTitleInstance = new DeleteTitle();
  try {
    await deleteTitleInstance.deleteTitle(titleIDs);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteTitle;

import { DeletePatent } from '../../../../../../repository/handleAcademicRecord/patent/deletePatent.js';

const deletePatent = async (req, res) => {
  const { patentIDs, userID } = req.body;
  const deletePatentInstance = new DeletePatent();
  try {
    await deletePatentInstance.deletePatent(patentIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deletePatent;

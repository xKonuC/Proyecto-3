import { DeleteStorage4 } from '../../../../../../repository/storage/deleteStorage4.js';

const deleteProjectURL = async (req, res, next) => {
  const {
    projectURL,
  } = req.body;
  const deleteStorageInstance4 = new DeleteStorage4();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await deleteStorageInstance4.deleteStorage4(projectURL, access_token);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default deleteProjectURL;

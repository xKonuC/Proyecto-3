import { CreateStorage } from '../../../../repository/storage/createStorage.js';

const uploadArchiveToBucket = async (req, res, next) => {
  const file = req.file;
  const createStorageInstance = new CreateStorage();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    req.body.archiveURL = await createStorageInstance.createStorage(file, access_token);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export { uploadArchiveToBucket };

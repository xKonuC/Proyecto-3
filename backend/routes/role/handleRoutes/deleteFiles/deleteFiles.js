import { DeleteStorage } from '../../../../repository/storage/deleteStorage.js';

const deleteFiles = async (documentIDs, access_token) => {
  const deleteStorageInstance = new DeleteStorage();
  await deleteStorageInstance.deleteStorage(documentIDs, access_token);
};

export { deleteFiles };

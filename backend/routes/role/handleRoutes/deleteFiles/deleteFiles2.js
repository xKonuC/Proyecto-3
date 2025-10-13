import { DeleteStorage2 } from '../../../../repository/storage/deleteStorage2.js';

const deleteFiles2 = async (studentHasTitleIDs, access_token) => {
  const deleteStorageInstance = new DeleteStorage2();
  await deleteStorageInstance.deleteStorage2(studentHasTitleIDs, access_token);
};

export { deleteFiles2 };

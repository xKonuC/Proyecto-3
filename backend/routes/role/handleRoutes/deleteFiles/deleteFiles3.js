import { DeleteStorage3 } from '../../../../repository/storage/deleteStorage3.js';

const deleteFiles3 = async (academicHasTitleIDs, access_token) => {
  const deleteStorageInstance3 = new DeleteStorage3();
  await deleteStorageInstance3.deleteStorage3(academicHasTitleIDs, access_token);
};

export { deleteFiles3 };

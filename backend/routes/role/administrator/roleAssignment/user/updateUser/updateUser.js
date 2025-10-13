import { UpdateUser } from '../../../../../../repository/roleAssignment/user/updateUser.js';

const updateUser = async (req, res, next) => {
  const {
    userID, rut, email, personalEmail, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, phone, workPlace, phoneWork, job, entry, group, articulation, previousEmail,
  } = req.body;
  const updateUserInstance = new UpdateUser();
  try {
    await updateUserInstance.updateUser(userID, rut, email, personalEmail, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, phone, workPlace, phoneWork, job, entry, group, articulation);

    if (previousEmail != email) {
      next();
      return;
    }
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateUser;

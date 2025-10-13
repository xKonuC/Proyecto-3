import { CreateUser } from '../../../../../../repository/roleAssignment/user/createUser.js';

const createUser = async (req, res, next) => {
  const {
    rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, workPlace, phoneWork, job, entry, group, articulation,
  } = req.body;
  const createUserInstance = new CreateUser();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const user = await createUserInstance.createUser(
      rut,
      firstName,
      secondName,
      surname1,
      surname2,
      sex,
      civilStatus,
      birthday,
      address,
      email,
      personalEmail,
      phone,
      workPlace,
      phoneWork,
      job,
      entry || 1999,
      group,
      articulation,
      access_token,
    );

    if (!(user && user.id)) {
      return res.status(409).json({ error: 'No se creo el usuario o ya este ya existe' });
    }
    req.userID = user.id;
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createUser;

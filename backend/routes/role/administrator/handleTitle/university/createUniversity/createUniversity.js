import { CreateUniversity } from '../../../../../../repository/handleTitle/university/createUniversity.js';

const createUniversity = async (req, res) => {
  const {
    name, city, country,
  } = req.body;
  const createUniversityInstance = new CreateUniversity();
  try {
    await createUniversityInstance.createUniversity(name, city, country);
    res.status(200).json({ verificationMessage: 'La universidad fue creado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createUniversity;

import { GetPublication } from '../../../../../../repository/handleAcademicRecord/publication/getPublication.js';

const listPublication = async (req, res) => {
  const { userID } = req.body;
  const getPublicationInstance = new GetPublication();
  try {
    const data = await getPublicationInstance.getPublication(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listPublication;

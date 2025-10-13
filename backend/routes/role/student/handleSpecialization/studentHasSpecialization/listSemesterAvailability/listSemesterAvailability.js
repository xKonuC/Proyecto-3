import { GetSemesterAvailability } from '../../../../../../repository/handleSpecialization/semester/getSemesterAvailability.js';

const listSemesterAvailability = async (req, res) => {
  const getSemesterAvailabilityInstance = new GetSemesterAvailability();
  try {
    const data = await getSemesterAvailabilityInstance.getSemesterAvailability();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listSemesterAvailability;

import { GetAcademicInfo } from '../../../../../../repository/handleAcademicRecord/academicInfo/getAcademicInfo.js';
import { GetBookChapter } from '../../../../../../repository/handleAcademicRecord/bookChapter/getBookChapter.js';
import { GetConsultancy } from '../../../../../../repository/handleAcademicRecord/consultancy/getConsultancy.js';
import { GetGuidedThesis } from '../../../../../../repository/handleAcademicRecord/guidedThesis/getGuidedThesis.js';
import { GetPatent } from '../../../../../../repository/handleAcademicRecord/patent/getPatent.js';
import { GetProject } from '../../../../../../repository/handleAcademicRecord/project/getProject.js';
import { GetPublication } from '../../../../../../repository/handleAcademicRecord/publication/getPublication.js';

const listAcademicRecord = async (req, res) => {
  const { userID } = req.body;
  const getAcademicInfoInstance = new GetAcademicInfo();
  const getBookChapterInstance = new GetBookChapter();
  const getConsultancyInstance = new GetConsultancy();
  const getGuidedThesisInstance = new GetGuidedThesis();
  const getPatentInstance = new GetPatent();
  const getProjectInstance = new GetProject();
  const getPublicationInstance = new GetPublication();

  try {
    const academicRecord = {
      academicInfo: await getAcademicInfoInstance.getAcademicInfo(userID),
      bookChapter: await getBookChapterInstance.getBookChapter(userID),
      consultancy: await getConsultancyInstance.getConsultancy(userID),
      guidedThesis: await getGuidedThesisInstance.getGuidedThesis(userID),
      patent: await getPatentInstance.getPatent(userID),
      project: await getProjectInstance.getProject(userID),
      publication: await getPublicationInstance.getPublication(userID),
    };

    res.status(200).json(academicRecord);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default listAcademicRecord;

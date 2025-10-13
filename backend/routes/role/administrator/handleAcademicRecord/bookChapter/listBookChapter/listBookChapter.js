import { GetBookChapter } from '../../../../../../repository/handleAcademicRecord/bookChapter/getBookChapter.js';

const listBookChapter = async (req, res) => {
  const { userID } = req.body;
  const getBookChapterInstance = new GetBookChapter();
  try {
    const data = await getBookChapterInstance.getBookChapter(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listBookChapter;

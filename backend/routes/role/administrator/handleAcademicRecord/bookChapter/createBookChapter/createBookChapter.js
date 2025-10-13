import { CreateBookChapter } from '../../../../../../repository/handleAcademicRecord/bookChapter/createBookChapter.js';

const createBookChapter = async (req, res) => {
  const {
    userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL,
  } = req.body;
  const createBookChapterInstance = new CreateBookChapter();
  try {
    await createBookChapterInstance.createBookChapter(userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createBookChapter;

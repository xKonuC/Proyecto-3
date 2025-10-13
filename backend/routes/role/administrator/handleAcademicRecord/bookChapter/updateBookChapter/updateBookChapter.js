import { UpdateBookChapter } from '../../../../../../repository/handleAcademicRecord/bookChapter/updateBookChapter.js';

const updateBookChapter = async (req, res) => {
  const {
    bookChapterID, userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL,
  } = req.body;
  const updateBookChapterInstance = new UpdateBookChapter();
  try {
    await updateBookChapterInstance.updateBookChapter(bookChapterID, userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateBookChapter;

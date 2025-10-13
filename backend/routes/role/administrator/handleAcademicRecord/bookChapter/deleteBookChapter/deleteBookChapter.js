import { DeleteBookChapter } from '../../../../../../repository/handleAcademicRecord/bookChapter/deleteBookChapter.js';

const deleteBookChapter = async (req, res) => {
  const { bookChapterIDs, userID } = req.body;
  const deleteBookChapterInstance = new DeleteBookChapter();
  try {
    await deleteBookChapterInstance.deleteBookChapter(bookChapterIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteBookChapter;

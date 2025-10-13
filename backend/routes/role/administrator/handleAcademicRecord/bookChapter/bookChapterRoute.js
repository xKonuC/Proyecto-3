import {
  express,
  listBookChapter,
  createBookChapter,
  updateBookChapter,
  deleteBookChapter,
  validateUserID,
  validateBookChapterID,
  validateBookChapter,
  validateArrayBookChapterID,
} from './bookChapter.modules.js';

const bookChapterRoute = express.Router();

bookChapterRoute.route('/')
  .get(validateUserID, listBookChapter)
  .post(validateUserID, validateBookChapter, createBookChapter)
  .put(validateUserID, validateBookChapterID, validateBookChapter, updateBookChapter)
  .delete(validateArrayBookChapterID, deleteBookChapter);

export default bookChapterRoute;

import {
  express, rubricHasQuestionRoute, rubricHasSectionRoute, rubricRoute, answerRoute,
} from './handleRubricModules.js';

const handleRubricRoute = express.Router();
handleRubricRoute.use('/rubric', rubricRoute);
handleRubricRoute.use('/rubricHasQuestion', rubricHasQuestionRoute);
handleRubricRoute.use('/rubricHasSection', rubricHasSectionRoute);
handleRubricRoute.use('/answer', answerRoute);

export default handleRubricRoute;

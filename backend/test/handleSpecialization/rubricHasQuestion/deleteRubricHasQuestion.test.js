import { DeleteRubricHasQuestion } from "../../../repository/handleSpecialization/rubricHasQuestion/deleteRubricHasQuestion.js";

describe('repository/handleSpecialization/rubricHasQuestion/deleteRubricHasQuestion.js',()=>{
    test('should return an successfully message', async()=>{
        const deleteRubricHasQuestionInstance = new DeleteRubricHasQuestion();
        const rubricHasQuestionIDs = [3];
        const {result} = await deleteRubricHasQuestionInstance.deleteRubricHasQuestion(rubricHasQuestionIDs);
        expect(result.affectedRows).toBe(1);
    });
});
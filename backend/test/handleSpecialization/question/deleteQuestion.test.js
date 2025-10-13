import { DeleteQuestion } from "../../../repository/handleSpecialization/question/deleteQuestion.js";

describe('repository/handleSpecialization/question/deleteQuestion.js', ()=>{
    test('should return an successfully message', async ()=>{
        const deleteQuestionInstance = new DeleteQuestion();
        const questionsID = [9];
        const userID = 1;
        const {result} = await deleteQuestionInstance.deleteQuestion(questionsID,userID);
        expect(result.affectedRows).toBe(1);
    });
});
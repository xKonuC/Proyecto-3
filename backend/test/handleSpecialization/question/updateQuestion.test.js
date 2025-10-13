import { UpdateQuestion } from "../../../repository/handleSpecialization/question/updateQuestion";

describe('repository/handleSpecialization/question/updateQuestion.js', ()=>{
    test('should return an successfully message', async()=>{
        const updateQuestionInstance = new UpdateQuestion();
        const questionID = 10;
        const userID = 1; 
        const question = "00question";
        const active = true;
        const {result} = await updateQuestionInstance.updateQuestion(questionID,userID,question, active);
        expect(result.affectedRows).toBe(1);
    });
});
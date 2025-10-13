import { CreateQuestion } from "../../../repository/handleSpecialization/question/createQuestion.js";

describe('repository/handleSpecialization/question/createQuestion.js', ()=>{
    test('should return a successfully message', async()=>{
        const createQuestionInstance = new CreateQuestion();
        const question = "question";
        const userID = 1;
        const {result} = await createQuestionInstance.createQuestion(userID, question);
        expect(result.affectedRows).toBe(1);
    });
});
import { SelectQuestion } from "../../../repository/handleSpecialization/question/selectQuestion";

describe('repository/handleSpecialization/question/selectQuestion.js', ()=>{
    test('should return an user questions', async()=>{
        const selectQuestionInstance = new SelectQuestion();
        const userID = 1;
        const {result} = await selectQuestionInstance.selectQuestion(userID);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].questionID).toBe('number');
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].question).toBe('string');
            expect(typeof result[0].isActive).toBe('number');
        }
    });
});
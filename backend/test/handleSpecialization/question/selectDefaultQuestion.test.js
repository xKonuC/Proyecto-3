import { SelectDefaultQuestion } from "../../../repository/handleSpecialization/question/selectDefaultQuestion.js";

describe('repository/handleSpecialization/question/selectDefaultQuestion.js', ()=>{
    test('should return an questions array', async ()=>{
        const selectDefaultQuestionInstance = new SelectDefaultQuestion();
        const {result} = await selectDefaultQuestionInstance.selectDefaultQuestion();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].questionID).toBe('number');
            expect(typeof result[0].question).toBe('string');
            expect(typeof result[0].isActive).toBe('number');

        }
    });
});
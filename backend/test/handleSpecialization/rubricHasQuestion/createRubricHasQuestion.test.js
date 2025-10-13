import { CreateRubricHasQuestion } from "../../../repository/handleSpecialization/rubricHasQuestion/createRubricHasQuestion";

describe('repository/handleSpecialization/rubricHasQuestion/createRubricHasQuestion.js', ()=>{
    test('should return an successfully message', async()=>{
        const createRubricHasQuestionInstance = new CreateRubricHasQuestion();
        const data = {rubricHasSectionID: 1, questionID: 2, positionNumber: 1, answer: 'Bien'}
        const {result} = await createRubricHasQuestionInstance.createRubricHasQuestion(data);
        expect(result.affectedRows).toBe(1);
    });
});
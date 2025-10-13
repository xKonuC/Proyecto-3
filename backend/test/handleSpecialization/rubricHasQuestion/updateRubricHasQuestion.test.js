import { UpdateRubricHasQuestion } from "../../../repository/handleSpecialization/rubricHasQuestion/updateRubricHasQuestion";

describe('repository/handleSpecialization/rubricHasQuestion/updateRubricHasQuestion.js', ()=>{
    test('should return an successfully message', async ()=>{
        const updateRubricHasQuestionInstance = new UpdateRubricHasQuestion();
        const data = {
            rubricHasSectionID: 1, questionID: 1, positionNumber: 1, answer: 'Aceptable', rubricHasQuestionID: 4
        };
        const {result} = await updateRubricHasQuestionInstance.updateRubricHasQuestion(data);
        expect(result.affectedRows).toBe(1);
    });
});
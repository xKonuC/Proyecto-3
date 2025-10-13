import { SelectThesisEvaluation } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectThesisEvaluation";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectThesisEvaluation.js', ()=>{
    test('should return an array with thesisEvaluation', async()=>{
        const selectThesisEvaluationInstance = new SelectThesisEvaluation();
        const userID = 2;
        const {result} = await selectThesisEvaluationInstance.selectThesisEvaluation(userID);
        expect(Array.isArray(result)).toBe(true);
    });
});
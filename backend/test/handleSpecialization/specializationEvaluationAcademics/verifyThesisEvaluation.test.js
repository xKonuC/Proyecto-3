import { VerifyThesisEvaluation } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/verifyThesisEvaluation";

describe('repository/handleSpecialization/specializationEvaluationAcademics/verifyThesisEvaluation.js', ()=>{
    test('should not return an item thesisEvaluation', async()=>{
        const verifyThesisEvaluationInstance = new VerifyThesisEvaluation();
        const userID = 999;
        const specializationHasSemesterID = 999;
        const result = await verifyThesisEvaluationInstance.verifyThesisEvaluation(userID, specializationHasSemesterID);
        expect(result).toBe(undefined);
    });
});
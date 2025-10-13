import { SelectSpecializationEvaluationAcademics } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationEvaluationAcademics";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationEvaluationAcademics.js', ()=>{
    test('should return an array with type of evaluation', async()=>{
        const selectSpecializationEvaluationAcademicsInstance = new SelectSpecializationEvaluationAcademics();
        const typeEvaluateID = 1;
        const {result} = await selectSpecializationEvaluationAcademicsInstance.selectSpecializationEvaluationAcademics(typeEvaluateID);
        expect(Array.isArray(result)).toBe(true);
    }); 
})
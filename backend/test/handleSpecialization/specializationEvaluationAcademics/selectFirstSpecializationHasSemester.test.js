import { SelectFirstSpecializationHasSemester } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectFirstSpecializationHasSemester";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectFirstSpecializationHasSemester.js', ()=>{
    test('should return an array preprojectEvaluation', async ()=>{
        const userID = 1;
        const selectFirstSpecializationHasSemesterInstance = new SelectFirstSpecializationHasSemester();
        const {result} = await selectFirstSpecializationHasSemesterInstance.selectFirstSpecializationHasSemester(userID);
        expect(Array.isArray(result)).toBe(true);
    });
});
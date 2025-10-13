import { SelectSpecializationHasAcademic } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationHasAcademic";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectSpecialization', ()=>{
    test('should return an array preprojectevaluation', async ()=>{
        const selectSpecializationHasAcademicInstance = new SelectSpecializationHasAcademic();
        const studentHasSemesterID = 10;
        const {result} = await selectSpecializationHasAcademicInstance.selectSpecializationHasAcademic(studentHasSemesterID);
        expect(Array.isArray(result)).toBe(true);
    });
});
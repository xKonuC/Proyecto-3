import { SelectSpecializationHasAcademic2 } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationHasAcademic2";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationHasAcademic2.js', ()=>{
    test('should return an array preprojectevaluation', async()=>{
        const selectSpecializationHasAcademic2Instance = new SelectSpecializationHasAcademic2();
        const studentHasSemesterID = 13;
        const {result} = await selectSpecializationHasAcademic2Instance.selectSpecializationHasAcademic2(studentHasSemesterID);
        expect(Array.isArray(result)).toBe(true);
    });
});
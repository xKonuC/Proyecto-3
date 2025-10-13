import { SelectSpecializationHasStudent } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationHasStudent";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectSpecializationHasStudent.js', ()=>{
    test('should return an array', async ()=>{
        const selectSpecializationHasStudentInstance = new SelectSpecializationHasStudent();
        const table = 'preprojectEvaluation';
        const userID = 3;
        const studentHasSemesterID = 3;
        const {result} = await selectSpecializationHasStudentInstance.selectSpecializationHasStudent(table, userID, studentHasSemesterID);
        expect(Array.isArray(result)).toBe(true);
    });
});
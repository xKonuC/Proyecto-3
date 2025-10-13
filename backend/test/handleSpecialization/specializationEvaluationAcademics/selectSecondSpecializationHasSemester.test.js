import { SelectSecondSpecializationHasSemester } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/selectSecondSpecializationHasSemester";

describe('repository/handleSpecialization/specializationEvaluationAcademics/selectSecondSpecializationHasSemester.js', ()=>{
    test('', async()=>{
        const selectSecondSpecializationHasSemesterInstance = new SelectSecondSpecializationHasSemester();
        const userID = 1;
        const {result} = await selectSecondSpecializationHasSemesterInstance.selectSecondSpecializationHasSemester(userID);
        expect(Array.isArray(result)).toBe(true);

    });
})
import { VerifySecondSpecializationHasSemester } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/verifySecondSpecializationHasSemester";

describe('repository/handleSpecialization/specializationEvaluationAcademics/verifySecondSpecializationHasSemester.js', ()=>{
    test('should return an array of preprojectEvaluation', async()=>{
        const verifySecondSpecializationHasSemesterInstance = new VerifySecondSpecializationHasSemester();
        const userID = 2;
        const specializationHasSemesterID = 10;
        const {result} = await verifySecondSpecializationHasSemesterInstance.verifySecondSpecializationHasSemester(userID, specializationHasSemesterID);
        expect(Array.isArray(result)).toBe(true);
    });
});
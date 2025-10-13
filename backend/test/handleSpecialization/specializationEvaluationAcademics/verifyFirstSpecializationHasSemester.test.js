import { VerifyFirstSpecializationHasSemester } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/verifyFirstSpecializationHasSemester";

describe('repository/handleSpecialization/specializationEvaluationAcademics/verifySpecializationHasSemester.js', ()=>{
    test('should return a message', async()=>{
        const userID = 2;
        const studentHasSemesterID = 10;
        const verifyFirstSpecializationHasSemesterInstance = new VerifyFirstSpecializationHasSemester();
        const {result} = await verifyFirstSpecializationHasSemesterInstance.verifyFirstSpecializationHasSemester(userID, studentHasSemesterID);
        expect(Array.isArray(result)).toBe(true);
    });
});
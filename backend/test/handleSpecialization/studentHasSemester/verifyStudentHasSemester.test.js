import { VerifyStudentHasSemester } from "../../../repository/handleSpecialization/studentHasSemester/verifyStudentHasSemester";

describe('repository/handleSpecialization/studentHasSemester/verifyStudentHasSemester.js', ()=>{
    test('should return an array studentHasSemester', async()=>{
        const verifyStudentHasSemesterInstance = new VerifyStudentHasSemester();
        const userID = 2;
        const studentHasSemesterID = 2;
        const result = await verifyStudentHasSemesterInstance.verifyStudentHasSemester(userID, studentHasSemesterID);
        if(result){
            expect(typeof result.studentHasSemesterID).toBe('number');
            expect(typeof result.userID).toBe('number');
            expect(typeof result.semesterID).toBe('number');
            expect(typeof result.semesterStatusID).toBe('number');
            expect(typeof result.specializationID).toBe('number');
        }
    });
});
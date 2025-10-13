import { UpdateStudentHasSpecialization } from "../../../repository/handleSpecialization/studentHasSpecialization/updateStudentHasSpecialization";

describe('repository/handleSpecialization/studentHasSpecialization/updateStudentHasSpecialization.js',()=>{
    test('should return a successfully message', async()=>{
        const studentHasSpecializationID = 2;
        const specializationID = 2;
        const entrySemesterID = 2;
        const userID = 1;
        const semesterStatusID = 1;
        const updateStudentHasSpecializationInstance = new UpdateStudentHasSpecialization();
        const {result} = await updateStudentHasSpecializationInstance.updateStudentHasSpecialization(studentHasSpecializationID, specializationID, entrySemesterID, userID, semesterStatusID);
        expect(result.affectedRows).toBe(1);
    });
});
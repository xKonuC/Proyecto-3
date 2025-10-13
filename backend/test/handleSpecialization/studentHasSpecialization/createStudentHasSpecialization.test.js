import { CreateStudentHasSpecialization } from "../../../repository/handleSpecialization/studentHasSpecialization/createStudentHasSpecialization";

describe('repository/handleSpecialization/studentHasSpecialization/createStudentHasSpecialization.js', ()=>{
    test('should return a succesfully message', async()=>{
        const userID = 4;
        const specializationID = 2;
        const semesterID = 2;
        const createStudentHasSpecializationInstance = new CreateStudentHasSpecialization();
        const {result} = await createStudentHasSpecializationInstance.createStudentHasSpecialization(userID, specializationID, semesterID);
        expect(result.affectedRows).toBe(1); 
    });
});
import { UpdateStatusID } from "../../../repository/handleSpecialization/specializationHasSemester/updateStatusID.js";

describe('repository/handleSpecialization/specializationHasSemester/updateStatusID.js', ()=>{
    test('should return an successfully message', async()=>{
        const studentHasSemesterID = 2;
        const statusID = 1;
        const updateStatusIDInstance = new UpdateStatusID();
        const {result} = await updateStatusIDInstance.updateStatusID(studentHasSemesterID, statusID);
        expect(result.affectedRows).toBe(1);
    });
});
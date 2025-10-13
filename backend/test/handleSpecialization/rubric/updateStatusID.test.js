import { UpdateStatusID } from "../../../repository/handleSpecialization/rubric/updateStatusID.js";

describe('repository/handleSpecialization/rubric/updateStatusID.js', ()=>{
    test('should return a succesfully message', async()=>{
        const updateStatusIDInstance = new UpdateStatusID();
        const rubricID = 2;
        const statusID = 2;
        const {result} = await updateStatusIDInstance.updateStatusID(rubricID, statusID);
        expect(result.affectedRows).toBe(1);
    });
});
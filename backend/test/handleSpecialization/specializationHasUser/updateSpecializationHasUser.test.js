import { UpdateSpecializationHasUser } from "../../../repository/handleSpecialization/specializationHasUser/updateSpecializationHasUser";

describe('repository/handleSpecialization/specializationHasUser/updateSpecializationHasUser.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateSpecializationHasUserInstance =new UpdateSpecializationHasUser();
        const specializationHasUserID = 2;
        const specializationID = 2;
        const entrySemester = 2;
        const userID = 1;
        const {result} = await updateSpecializationHasUserInstance.updateSpecializationHasUser(specializationHasUserID, specializationID, entrySemester, userID);
        expect(result.affectedRows).toBe(1);
    });
});
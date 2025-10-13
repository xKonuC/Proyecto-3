import { CreateSpecializationHasUser } from "../../../repository/handleSpecialization/specializationHasUser/createSpecializationHasUser";

describe('repository/handleSpecialization/specializationHasUser/createSpecializationHasUser.js', ()=>{
    test('should return a successfully message', async()=>{
        const userID = 1;
        const specializationID = 2; 
        const entrySemester = 2;
        const createSpecializationHasUserInstance = new CreateSpecializationHasUser();
        const {result} = await createSpecializationHasUserInstance.createSpecializationHasUser(userID, specializationID, entrySemester);
        expect(result.affectedRows).toBe(1);

    });
});